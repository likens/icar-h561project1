import { Fragment } from 'react'

function Modal(props: any) {

	return (
       <Fragment>
            <div className={`modal ${props.name ? `modal--active` : ``}`}>
                <div className='modal-close' onClick={() => props.reset(true)}>X</div>
                <div className='modal-video'>
                    <div className='modal-connecting'>Connecting...</div>
                    <video src={`/video/${props.video}.mp4`} 
                            autoPlay={true}
                            controls={false} 
                            muted={true} 
                            loop={true} />
                </div>
                <div className='modal-body'>
                    <div className='modal-live'>Live</div>
                    <div className={`modal-image modal-image--${props.bubble}`}>
                        <img src={`/image/${props.image}.jpg`} alt='0' />
                    </div>
                    <div className='modal-main'>
                        <div className='modal-name'>{props.name}</div>
                        <div className='modal-sub'>{props.sub}</div>
                    </div>
                </div>
                <div className='modal-contact'>

                </div>
            </div>
       </Fragment>
	)
}

export default Modal
