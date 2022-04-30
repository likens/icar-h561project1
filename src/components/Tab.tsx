import { Key } from 'react'
import Resource from './Resource';

function Tab(props: any) {

	return (
        <div className={`tab tab--${props.type} ${props.type === props.active ? `tab--active` : ``}`}>
            <div className='tab-title'>{props.type.charAt(0).toUpperCase() + props.type.slice(1)} Resources</div>
            <div className='units'>
                <div className='personnel'>
                    <div className='list-title'>Personnel</div>
                    <ul className='list'>
                        {props?.personnel?.map((p: any, i: Key | null | undefined) => {
                            return (
                                <li key={i} className={`list-item ${p.name === props.activeResource.name ? `list-item--active` : ``}`} onClick={() => props.select(p)}>
                                    <Resource resource={p}></Resource>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className='vehicles'>
                    <div className='list-title'>Vehicles</div>
                    <ul className='list'>
                        {props?.vehicles?.map((p: any, i: Key | null | undefined) => {
                            return (
                                <li key={i} className={`list-item ${p.name === props.activeResource.name ? `list-item--active` : ``}`} onClick={() => props.select(p)}>
                                    <Resource resource={p}></Resource>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className='air'>
                    <div className='list-title'>Air</div>
                    <ul className='list'>
                        {props?.air?.map((p: any, i: Key | null | undefined) => {
                            return (
                                <li key={i} className={`list-item ${p.name === props.activeResource.name ? `list-item--active` : ``}`} onClick={() => props.select(p)}>
                                    <Resource resource={p}></Resource>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>  
	)
}

export default Tab
