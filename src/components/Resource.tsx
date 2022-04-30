import { Fragment } from 'react'

function Resource(props: any) {

    let image = props.resource.image;

    if (!image) {
        props.resource.symbol ? image = props.resource.symbol : image = `/image/${props.resource.name}.jpg`;
    }
	return (
       <Fragment>
            <div className={`list-image list-image--${props.resource.bubble}`}>
                <div className={`list-bubble list-bubble--${props.resource.bubble}`}></div>
                <img src={image} alt='' />
            </div>
            <div className='list-name'>
                {props.resource.lname ? `${props.resource.lname}` : props.resource.name}
                {props.resource.fname ? <span>{`, ${props.resource.fname}`}</span> : ``}
            </div>
            <div className={`list-status list-status--${props.resource.bubble}`}>{props.resource.status ? props.resource.status : `Status`}</div>
            <div className='list-sub'>{props.resource.sub ? props.resource.sub : `Subtitle`}</div>
            <div className={`list-loc`}>{props.resource.loc ? props.resource.loc : 'Location'}</div>
       </Fragment>
	)
}

export default Resource
