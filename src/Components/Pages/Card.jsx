import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { DELETE, ADD, REMOVE } from '../../redux/actions/action';
const CardsData = () => {
  const [data, setData] = useState([]);
  // console.log("data : ", data);

  const { id } = useParams();

  const dispatch = useDispatch();

  const history = useNavigate();
  const getdata = useSelector((state) => state.cartreducer.carts);
  console.log(getdata);

  // delete
  const dlt = (id) => {
    dispatch(DELETE(id));
    history('/');
  }


  // add
  const send = (e)=>{
    // console.log(e);
    dispatch(ADD(e));
  }

  // remove one
const remove = (item)=>{
  dispatch(REMOVE(item))
}

  const compare = () => {
    let comparedata = getdata.filter((e) => {
      return e.id === id;
    });
    setData(comparedata);
    console.log("compare", comparedata);
  }

  useEffect(() => {
    compare();
  }, [id])

  return (
    <>
      <div className='container mt-2' >
        <h2 className='text-center'>Items Details</h2>
        <section className='container mt-3 border shadow' style={{ width: "80%", margin: "auto" }}>
          <div className='iteamsdetails' style={{ display: "flex" }}>
            {
              data.map((ele) => {
                return (
                  <>
                    <div className='items_img mt-2' style={{ alignItems: "center", textAlign: "center" }}>
                      <img variant="top" style={{ height: "16rem" }} src={ele.imgdata}
                        alt='food__Image' />
                    </div>
                    <div className='details ps-5'>
                      <Table style={{ display: "flex" }}>
                        <tr>
                          <td>
                            <p><strong>Restaurant</strong> : {ele.rname}</p>
                            <p><strong>Price</strong> : ₹ {ele.price}</p>
                            <p><strong>Dishes</strong> : {ele.address}</p>
                            <p><strong>Total</strong> : ₹ {ele.price * ele.qnty}</p>
                            <div className='mt-5 d-flex justify-content-between align-items-center' style={{ width: 100, cursor: "pointer", background: "#ddd", color: "#111" }}>
                              <span style={{ fontSize: 24 }} onClick={ele.qnty <= 1 ? () => dlt(ele.id) : () => remove(ele)}>-</span>
                              <span style={{ fontSize: 22 }}>{ele.qnty}</span>
                              <span style={{ fontSize: 24 }} onClick={() => send(ele)}>+</span>
                            </div>
                          </td>
                          <td>
                            <p><strong>Rating :</strong> <span style={{ backgroundColor: "green", color: "white", padding: "2px 5px", borderRadius: "5px" }}> {ele.rating} &#9733;</span></p>
                            <p><strong>Order Review :</strong> <span>{ele.somedata}</span></p>
                            <p><strong>Remove :</strong> <span><i onClick={() => dlt(ele.id)} className='fa fa-trash' style={{ color: "red", fontSize: "20px", cursor: "pointer" }}></i></span></p>
                          </td>
                        </tr>
                      </Table>
                    </div>
                  </>
                )
              })
            }
          </div>
        </section>
      </div>
    </>
  )
}

export default CardsData;