import noImg from '../../assets/no-img.png';

const MovieModal = (props) => {
    let modalStyle = {
        display: "block",
        backgroundColor: "rgba(0,0,0,.8)"
    }
    return (
        <>
            <div className="modal show fade" style={modalStyle}>
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" onClick={props.hide} data-bs-dismiss="modal" aria-label="Close"></button>
                                
                            </div>
                            <div className="modal-header d-flex justify-content-center align-items-center">
                                <img src={!props.movieProp[0] ? noImg : `https://www.themoviedb.org/t/p/w220_and_h330_face/${props.movieProp[0]}`} alt=""  className="modal-img"></img>
                            </div>
                            
                            <div className="modal-body">
                                <div className="d-flex flex-column mb-3">
                                    <h6 className="fw-bold">Movie Name:</h6>
                                    <h6>{props.movieProp[1]}</h6>
                                </div>

                                <div className="d-flex flex-column mb-3">
                                    <h6 className="fw-bold">Plot:</h6>
                                    <h6>{props.movieProp[2]}</h6>
                                </div>

                                <div className="d-flex flex-column mb-3">
                                    <h6 className="fw-bold">Released:</h6>
                                    <h6>{props.movieProp[3]}</h6>
                                </div>

                                <div className="d-flex flex-column mb-3">
                                    <h6 className="fw-bold">IMDB:</h6>
                                    <h6>{props.movieProp[4]}</h6>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
        </>

    )
}

export default MovieModal;
