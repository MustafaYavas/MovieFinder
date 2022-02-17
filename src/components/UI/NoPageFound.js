const NoPageFound = () => {
    return (
        <div className="mt-5">
            <h2 className="text-center text-danger">Upppsss...</h2>
            <h2 className="text-center text-danger">The Page You Looking For Seems to Lost</h2>

            <div className="d-flex justify-content-center mt-5">
                <a href="/home" className="btn btn-danger">
                    <i className="fas fa-rocket me-2"></i>
                    Fly me home!
                </a>
            </div>
        </div>
    )
}

export default NoPageFound;
