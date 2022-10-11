import React from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from 'antd'
import './index.less'

const { Footer } = Layout

function PageFooterRoot(props: any): React.ReactElement {
	const { t } = useTranslation()
	return (
		<footer className="app-page-footer">
			<Layout>
				<Footer>Copyright Admin &copy;2010 - 2020, {t('China')}</Footer>
			</Layout>
		</footer>
	)
}

export default React.memo(PageFooterRoot)
