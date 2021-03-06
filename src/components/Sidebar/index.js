import React, { useState, useEffect } from 'react'
import './Sidebar.scss'

const Sidebar = (props) => {
	const [navList, setNavList] = useState([])
	const [subLinksDropdownObj, setSubLinksDropdownObj] = useState({})

	useEffect(() => {
		fetch('https://portfolio-v2-2237f-default-rtdb.firebaseio.com/navigation.json'
		).then((response) => {
			return response.json()
		}).then((data) => {
			console.log('data', data)
			setNavList(data)
			storeSublistToggleStateHandler(data)
		})
	}, [])

	const storeSublistToggleStateHandler = (data) => {
		let object = {}
		for (let i = 0; i < data.length; i++) {
			object[data[i].title.toLowerCase() + 'Sublinks'] = 'close'
		}
		setSubLinksDropdownObj(object)
	}

	const openSubLinksHandler = (title) => {
		console.log('subLinksDropdownObj', subLinksDropdownObj)
		if (subLinksDropdownObj[title.toLowerCase() + 'Sublinks'] === 'open') {
			setSubLinksDropdownObj(prevState => ({
				...prevState,
				[title.toLowerCase() + 'Sublinks']: 'close'
			}))
		} else {
			setSubLinksDropdownObj(prevState => ({
				...prevState,
				[title.toLowerCase() + 'Sublinks']: 'open'
			}))
		}
	}

	const displaySidebarList = (listArr, parent)=> {
		let listHtml = []
		for (let i = 0; i < listArr.length; i++) {
			listHtml.push(
				<li key={i} data-sublist-toggle={subLinksDropdownObj[listArr[i].title.toLowerCase() + 'Sublinks']}>
					{/* <a href="">{listArr[i].title}</a> */}
					{listArr[i].title}
					{listArr[i].sublinks && listArr[i].sublinks.length > 0 ?
						<ul className="sidebar__sublist">
							{displaySidebarList(listArr[i].sublinks, false)}
						</ul> : 
						''
					}
					{parent ? 
						<span className="sidebar__list--arrow" onClick={() => openSubLinksHandler(listArr[i].title)}></span> : ''}
				</li>
			)
		}
		return listHtml
	}

	return (
		<section className="sidebar" data-sidebar-toggle={props.sidebarState}>
			<button className="sidebar__collapse" onClick={() => props.toggleSidebar(props.sidebarState)}>&#x2039;</button>
			<ul className="sidebar__list">{displaySidebarList(navList, true)}</ul>
		</section>
	)
}

export default Sidebar