import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import './Navbar.css';
import Table from 'react-bootstrap/Table'
import { useDispatch, useSelector } from 'react-redux';
import { DELETE } from '../../redux/actions/action';
const Header = () => {
  const [price, setPrice] = useState(0);
  // console.log(price);

  const getdata = useSelector((state) => state.cartreducer.carts);
  // console.log(getdata);

  const dispatch = useDispatch();

  const [isMobile, setIsMobile] = useState(false);
  const [close, setClose] = useState(null);
  const open = Boolean(close);
  const handleClick = (event) => {
    setClose(event.currentTarget)
  };
  const handleClose = () => {
    setClose(null);
  };

  const dlt = (id) => {
    dispatch(DELETE(id))
  }

  const total = () => {
    let price = 0;
    getdata.map((ele, k) => {
      price = ele.price *ele.qnty +  price;
    });
    setPrice(price);
  };

  useEffect(() => {
    total();
  }, [total])

  return (
    <nav className='navbar'>
      <h2 className='logo'
        onClick={() => setIsMobile(false)}
      >CrudApp</h2>
      <ul className={isMobile ? "nav-links-mobile" : "nav-links"}>
        <NavLink className='home ' to="/"><li>Home</li></NavLink>
        {/* <NavLink className='about' to="/about"><li>About</li></NavLink>
        <NavLink className='contact' to="/contact"><li>Contact</li></NavLink>
        <NavLink className='profile' to="/profile"><li>Profile</li></NavLink>
        <NavLink className='signup' to="/signup"><li>SignUp</li></NavLink> */}
      </ul>
      <button className='mobile-menu-icon'
        onClick={() => setIsMobile(!isMobile)}
      >
        {isMobile ? (<i className='fa fa-times'></i>) : (<i className='fa fa-bars'></i>)}
      </button>
      {
        getdata.length ?
          <div className='btn-group'>
            <button type="button" className="btn btn-secondary" onClick={handleClick} data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
              <i className="fa fa-shopping-cart"
                aria-hidden="true"><sup style={{ padding: "2px" }}>{getdata.length}</sup></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-lg-end">
              <li><button className="dropdown-item" type="button">
                <Table>
                  <thead style={{ display: "flex" }}>
                    <tr className='p-3'>Photos</tr><hr />
                    <th className='Restaurant__Name'>Restaurant Name</th>
                    <i className="fa fa-times" aria-hidden="true"
                      onClose={handleClose}
                      style={{ position: "absolute", top: -5, right: 0, fontSize: 23, cursor: "pointer" }}></i>
                  </thead><hr className="w-55 m-auto" />
                  <tbody>
                    {
                      getdata.map((e) => {
                        return (
                          <>
                            <tr style={{ padding: "0 5px" }}>
                              <td>
                                <NavLink to={`/cart/${e.id}`} onClick={handleClose} >
                                  <img src={e.imgdata} style={{ width: "10rem", height: "8rem" }} alt="image_data" />
                                </NavLink>
                              </td>
                              <td>
                                <p>{e.rname}</p>
                                <p>Price : {e.price}</p>
                                <p>Quantity : {e.qnty}</p>
                              </td>
                              <td className='mt-5'
                                style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => dlt(e.id)}>
                                <i className='fa fa-trash'></i>
                              </td>
                            </tr>
                          </>
                        )
                      })
                    }
                    <p className='text-center'>
                      Total : ₹{price}
                    </p>
                  </tbody>
                </Table>
              </button></li>
            </ul>
          </div> :
          <div className="btn-group">
            <button type="button" className="btn btn-secondary" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
              <i className="fa fa-shopping-cart"
                aria-hidden="true"><sup style={{ padding: "2px" }}>{getdata.length}</sup></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-lg-end">
              <li><button className="dropdown-item" type="button">your cart is empty</button></li>
              <i className="fa fa-times" aria-hidden="true"
                onClick={handleClose}
                style={{ position: "absolute", top: -5, right: 0, fontSize: 23, cursor: "pointer" }}></i>
            </ul>
          </div>
      }
    </nav>
  )
}

export default Header;