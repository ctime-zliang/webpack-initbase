import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Layout, List } from 'antd'
import { Link } from 'react-router-dom'
import styles from './index.module.less'

const { Content } = Layout

function ListRoot(props: any): React.ReactElement {
	console.log(`ListRoot ☆☆☆`, props)
	const { list } = props
	return (
		<>
			<Helmet>
				<title>Entry Link List</title>
			</Helmet>
			<section className={styles['list-container']}>
				<section className={styles['list-wrapper']}>
					<div className={styles['list-header']}>
						<span>Entry Link List</span>
					</div>
					<Content>
						<List
							size="small"
							bordered
							dataSource={list}
							renderItem={(item: any, index: number) => {
								const number: string = (++index, index) <= 9 ? '0' + index : String(index)
								return (
									<List.Item className="entry-linklist" style={{ justifyContent: 'flex-start' }}>
										<span style={{ paddingRight: '6px' }}>{number}.</span>
										<Link className={styles['link-item']} to={{ pathname: `${item.path}` }}>
											{item.title}
										</Link>
									</List.Item>
								)
							}}
						/>
					</Content>
				</section>
			</section>
		</>
	)
}

export default React.memo(ListRoot)
