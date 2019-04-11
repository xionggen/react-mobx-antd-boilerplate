import React from 'react';
import {Table, Input, InputNumber, Form, Button,} from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;
const EditableContext = React.createContext();

function EditableCell(props) {
    const {editing, dataIndex, title, inputType, record, index, ...restProps} = props;
    return (
        <EditableContext.Consumer>
            {(form) => {
                const { getFieldDecorator } = form;
                return (
                    <td {...restProps}>
                        {editing ? (
                            <FormItem style={{ margin: 0 }}>
                                {
                                    getFieldDecorator(dataIndex, {
                                        initialValue: record[dataIndex],
                                        rules: [
                                            {
                                                required: true,
                                                message: `${title}不能为空`
                                            }
                                        ]
                                    })(getInput())
                                }
                            </FormItem>
                        ) : restProps.children}
                    </td>
                );
            }}
        </EditableContext.Consumer>
    );

    function getInput() {
        return props.inputType === 'number' ? <InputNumber/> : <Input/>
    }
}


class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            ...this.props.tableColumns,
            {
                title: '操作',
                render: (text, record) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            {
                                editable ? (
                                    <span>
                                        <EditableContext.Consumer>
                                            {
                                                form => <Button style={{ marginRight: '10px' }} size="small" type="primary" onClick={() => this.save(form, record.key)}>保存</Button>
                                            }
                                        </EditableContext.Consumer>
                                        <Button size="small" onClick={() => this.cancel(record.key)}>取消</Button>
                                    </span>
                                ) : (
                                        <Button size="small" disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>编辑</Button>
                                )
                            }
                        </div>
                    );
                },
            }
        ];
        this.state = { 
            editingKey: '',
        };
    }
    // 判断编辑状态
    isEditing = record => record.key === this.state.editingKey;
    // 取消
    cancel = () => {
        this.setState({ editingKey: '' });
    }
    // 保存
    save = (form, key) => {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.props.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ editingKey: '' });
                this.props.onSave(newData);
            }
        });
    }
    // 切换到编辑状态
    edit = (key) => {
        this.setState({ editingKey: key });
    }
    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };
        let columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.inputType,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        const {form, data, ...restProps} = this.props;
        return (
            <EditableContext.Provider value={form}>
                <Table
                    components={components}
                    dataSource={data}
                    columns={columns}
                    rowClassName="editable-row"
                    rowKey={(record, index) => index}
                    {...restProps}/>
            </EditableContext.Provider>
        );
    }
}

EditableTable.defaultProps = {
    tableColumns: [],
    data: []
}

EditableTable.propTypes = {
    tableColumns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired
}


export default Form.create()(EditableTable);;