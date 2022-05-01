import { Fragment } from 'react'

function Modal(props: any) {

	return (
       <Fragment>
            <div className={`modal ${props.name ? `modal--active` : ``}`}>
                <div className='modal-close' onClick={() => props.reset(true)}>X</div>
                <div className='modal-video'>
                    <div className='modal-connecting'>Connecting...</div>
                    {props.video ? 
                        <video src={`/video/${props.video}.mp4`} 
                            autoPlay={true}
                            controls={false} 
                            muted={true} 
                            loop={true} /> : ``}
                </div>
                <div className='modal-body'>
                    <div className='modal-live'>Live</div>
                    <div className={`modal-image modal-image--${props.bubble}`}>
                        <img src={props.image} />
                    </div>
                    <div className='modal-main'>
                        <div className='modal-name'>{props.name}</div>
                        <div className='modal-sub'>{props.sub}</div>
                    </div>
                    <div className='modal-stats'>
                        <div className='modal-stat'>
                            <div className='modal-stat-circle'>
                                <div className='modal-stat-value'>97%</div>
                                <div className='modal-stat-sub'>Full</div>
                            </div>
                            <div className='modal-stat-name'>
                                <div className='modal-stat-icon'></div>
                                <div className='modal-stat-name'>Oxygen</div>
                            </div>
                        </div>
                        <div className='modal-stat'>
                            <div className='modal-stat-circle'>
                                <div className='modal-stat-value'>99.8</div>
                                <div className='modal-stat-sub'>Fahrenheight</div>
                            </div>
                            <div className='modal-stat-name'>
                                <div className='modal-stat-icon'></div>
                                <div className='modal-stat-name'>Body Temp</div>
                            </div>
                        </div>
                        <div className='modal-stat'>
                            <div className='modal-stat-circle'>
                                <div className='modal-stat-value'>110</div>
                                <div className='modal-stat-sub'>Bpm</div>
                            </div>
                            <div className='modal-stat-name'>
                                <div className='modal-stat-icon'></div>
                                <div className='modal-stat-name'>Heart Rate</div>
                            </div>
                        </div>
                    </div>
                    <div className='modal-blocks'>
                        <div className='modal-block'>
                            <div className='modal-block-icon'></div>
                            <div className='modal-block-title'>Status</div>
                            <div className='modal-block-value'>In Building</div>
                        </div>
                        <div className='modal-block'>
                            <div className='modal-block-icon'></div>
                            <div className='modal-block-title'>Location</div>
                            <div className='modal-block-value'>X, Y, Z</div>
                        </div>
                        <div className='modal-block'>
                            <div className='modal-block-icon'></div>
                            <div className='modal-block-title'>Closest Unit</div>
                            <div className='modal-block-value'>LD23</div>
                        </div>
                        <div className='modal-block'>
                            <div className='modal-block-icon'></div>
                            <div className='modal-block-title'>Time Deployed</div>
                            <div className='modal-block-value'>1 hr 45 min</div>
                        </div>
                    </div>
                </div>
                <div className='modal-contact'>
                    <div className='modal-contact-button'>
                        <div className='modal-contact-icon'></div>
                        <div className='modal-contact-text'>Message</div>
                    </div>
                    <div className='modal-contact-button'>
                        <div className='modal-contact-icon'></div>
                        <div className='modal-contact-text'>Call</div>
                    </div>
                </div>
            </div>
       </Fragment>
	)
}

export default Modal
