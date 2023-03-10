import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Auth } from "aws-amplify";

export function useGetUserRole({ session }) {
    const [userRole, setUserRole] = useState(null);

    const getUserRoleFromDB = useCallback(async (session) => {
        try {
            //console.log(session);
           // const accountId = JSON.parse(session.idToken.payload["https://hasura.io/jwt/claims"])["x-hasura-account-id"];

            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URI}/v1/graphql`,
                {
                    query: `
                     query MyQuery($id: uuid = "") {
                        user(where: {id: {_eq: $id}}) {
                                role
                            }
                        }
                    `,
                    variables: {
                        id: session?.accessToken?.payload?.sub,
                       // account_id: accountId,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${session?.idToken?.jwtToken}`,
                        "x-hasura-role": "site-user",
                    },
                }
            );

            //console.log("response.data");
            //console.log(response.data.data.role_table[0].user_role);
            const _userRole = response.data.data.user[0].role;
            setUserRole(_userRole);
        } catch (error) {
            setUserRole(null);
            await Auth.signOut();
        }
    }, []);
    useEffect(() => {
        if (session && session.isValid()) {
            getUserRoleFromDB(session);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session]);

    return userRole;
}
