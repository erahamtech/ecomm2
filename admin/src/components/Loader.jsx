export default ({ loading = false }) => {
    return( loading && 
        <div className="position-absolute" style={{ zIndex: "10001", inset: "0", background: "#0000000f", backdropFilter: "blur(2px)" }}>
            <div class="loader"></div>
        </div>
    )
}