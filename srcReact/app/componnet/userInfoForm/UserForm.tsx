import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'

const UserFormRoot = (): React.ReactElement => {
	const onFinish = (values: any): void => {
		console.log('Success:', values)
	}

	const onFinishFailed = (errorInfo: any): void => {
		console.log('Failed:', errorInfo)
	}

	return (
		<Form
			name="basic"
			labelCol={{ span: 4 }}
			wrapperCol={{ span: 12 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
				<Input />
			</Form.Item>

			<Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
				<Input.Password />
			</Form.Item>

			<Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 4, span: 16 }}>
				<Checkbox>Remember me</Checkbox>
			</Form.Item>

			<Form.Item wrapperCol={{ offset: 4, span: 16 }}>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	)
}

export default React.memo(UserFormRoot)
