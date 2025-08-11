import magichand from "../assets/magichand.gif";

function HandsContainer () {
    return (
        <div className="hands-container">
            <img src={magichand} className="right-magic-hand"/>
            <img src={magichand} className="left-magic-hand"/>
        </div>
    )
}

export default HandsContainer