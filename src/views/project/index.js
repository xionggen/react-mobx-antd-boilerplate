import React from 'react';
import styles from '../../assets/styles/project.module.css';
// import AppHeader from '../../components/appHeader';
import {Typography} from 'antd';

const { Paragraph } = Typography;

class Project extends React.Component {
    render() {
        return (
            <div className={styles.project}>
                <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                    Ant Design, a design language for background applications, is refined by Ant UED Team.
                    Ant Design, a design language for background applications, is refined by Ant UED Team.
                    Ant Design, a design language for background applications, is refined by Ant UED Team.
                    Ant Design, a design language for background applications, is refined by Ant UED Team.
                    Ant Design, a design language for background applications, is refined by Ant UED Team.
                    Ant Design, a design language for background applications, is refined by Ant UED Team.
                </Paragraph>
            </div>
        );
    }
}

export default Project;