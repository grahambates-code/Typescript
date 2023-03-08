import React, { useState } from 'react';
import { RightOutlined } from '@ant-design/icons';
import { useMemo } from 'react';

const Collapser = (props) => {
  const { open, handleOpen, header, children } = props;

  return (
    <>
      <div className={`collapse-header ${open ? 'expanded' : 'holded'}`} onClick={handleOpen}>
        <RightOutlined className={open ? 'down-less' : 'left-less'} />&nbsp;&nbsp;
        {header}
      </div>
      <div className={`collapse-content ${open ? "expanded-content" : 'holded-content'}`}>
        {children}
      </div>
    </>
  )
};

export default Collapser;