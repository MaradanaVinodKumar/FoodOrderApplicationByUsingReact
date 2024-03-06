import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./index.css";

function App() {
  const [getData, setData] = useState([]);

  const [getCount, setCount] = useState([]);
  const [CartIsOpen, SetCartIsOpen] = useState(false);

  const addToCart = (index) => {
    setCount((meals) => [...meals, getData[index]]);
  }

  useEffect(() => {
    async function fetchData() {

      const res = await fetch("https://tthdnz-3000.csb.app/meals");
      return res.json();
    }

    fetchData().then((data) => {
      setData(() => [...data]);
      console.log(data);
    })
  }, [])

  return (
    <Container >
      <div className="head-Row">
        <div className="head-Name">
          <h1><span className="V">V</span>ishesh <span className="V">M</span>eal's</h1>
        </div>
        <div className="Col">
          <button className="head-button" onClick={() => { SetCartIsOpen(!CartIsOpen) }}><h2>Cart({getCount.length})</h2></button>
        </div>
      </div>

      <div className="Row">
        {
          getData.map((meal, index) => {
            return (
              <div key={meal.id} className="meal">

                <div className="meal-image-container">
                  <img src={"https://tthdnz-3000.csb.app/" + meal.image} className="meal-image" />
                </div>
                <div><h2 style={{ margin: 0 }}>{meal.name}</h2></div>
                <div className="Row">
                  <h2 className="Row-price" style={{ margin: 0, marginTop: 5 }}>{"₹ " + Math.floor(meal.price * 81) + "/-"}</h2>
                </div>
                <div className="meal-p">
                  <p>{meal.description}</p>
                </div>
                <button className="meal-button" onClick={() => { addToCart(index) }}>Add To Cart</button>

              </div>
            )
          })
        }
      </div>
      {
        CartIsOpen && <div className="Cart-continer" onClick={() => { SetCartIsOpen(!CartIsOpen) }}>
          <div className="Cart" style={{ padding: 10, color: "#444444" }} onClick={() => { }}>
            <h2>Your Cart</h2>
            {
              getCount.map((meal, index) => {
                return (
                  <div className=" Row" >
                    <div style={{ width: "70%" }} ><h3 style={{ margin: 0, color: "#8a8888" }} >{meal.name}</h3></div>
                    <div style={{ width: "30%" }}>
                      <button className="head-button" style={{ color: "#000000" }}><h1 style={{ margin: 0 }} >-</h1></button>
                      <span style={{ color: "black" }}>{2}</span>
                      <button className="head-button" style={{ color: "black" }}><h1 style={{ margin: 0 }} >+</h1></button>
                    </div>
                  </div>
                )
              })

            }
            <div className="Order" ><button className="meal-button">Order</button></div>

          </div>
        </div>
      }


    </Container>
  );
}

export default App;
// 