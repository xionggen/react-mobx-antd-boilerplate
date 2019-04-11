import React from 'react';
import { Spin } from 'antd';

export default function AppLoading(props) {
    const {loading} = props;
    const maskStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
    const loadingContent = (
        <div style={maskStyle}>
            <Spin tip="加载中..."/>
        </div>
    );
    return loading ? loadingContent : null;
}