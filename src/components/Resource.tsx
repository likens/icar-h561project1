import { Fragment } from 'react'

function Resource(props: any) {

    let image = props.resource.image ? props.resource.image : `/image/${props.resource.name}.jpg`;

	return (
       <Fragment>
            <div className={`list-image list-image--${props.resource.bubble}`}>
                <div className={`list-bubble list-bubble--${props.resource.bubble}`}>

                    {props.resource.bubble === "check" ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg> : ``}

                    {props.resource.bubble === "sleep" ? <Fragment><sub>Z</sub><sup>z</sup></Fragment> : ``}

                    {props.resource.bubble === "idle" ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z"/></svg> : ``}

                    {props.resource.bubble === "alert" ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path d="M64 352c17.69 0 32-14.32 32-31.1V64.01c0-17.67-14.31-32.01-32-32.01S32 46.34 32 64.01v255.1C32 337.7 46.31 352 64 352zM64 400c-22.09 0-40 17.91-40 40s17.91 39.1 40 39.1s40-17.9 40-39.1S86.09 400 64 400z"/></svg> : ``}
                    
                </div>
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
