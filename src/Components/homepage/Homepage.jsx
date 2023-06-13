import { useState, useEffect } from "react";
import Nav from "../nav/Nav";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import homecss from "./Home.module.css";
import Listcreate from "../listcreate/Listcreate";
import axios from "axios";
import Modal from "../modelopen/Model";
import { setvaluefalse, setproduct } from "../../app/features/Checkinglogin";
import { useSelector, useDispatch } from "react-redux";
const Homepage = () => {
  const dispatch = useDispatch();
  let array_from_redux = useSelector(
    (state) => state.checks.backend_data_fetch_array
  );
  let before_add_product_login_check = useSelector(
    (state) => state.checks.value
  );
  
  const loginvalue = useSelector((state) => state.checks.loginvalue);
  const signupvalue = useSelector((state) => state.checks.signupvalue);
  const productvalue = useSelector((state) => state.checks.productvalue);

  const imgs = new URL(
    "../../../public/image/cuvveteprojectimg.png",
    import.meta.url
  );
  const [upvote, setupvote] = useState(false);
  const [getDataFromBackend, setgetDataFromBackend] = useState([]);
  const [openModal, setOpenModal] = useState(true);
  const votechange = () => {
    // let array_get=array_from_redux
    getDataFromBackend.sort((a, b) => a.voting_count - b.voting_count);
    setupvote(!upvote);
  };
  const closeHandler = () => {
    setOpenModal(false);
    dispatch(setvaluefalse());
  };

  const add_product = () => {

    
    if (before_add_product_login_check) {
      if (array_from_redux.length)
        getDataFromBackend.push(array_from_redux[array_from_redux[0]]);
      setOpenModal(true);
      dispatch(setproduct());
    }
    else alert("Please Login First");
  }

  useEffect(() => {
    const fetchdata = async () => {
      let getdata = await axios.get("https://cuvvete-backend.onrender.com");
      setgetDataFromBackend([...getdata.data]);
    };
    fetchdata();
  }, []);


  if (getDataFromBackend.length === 0) {
    return <h1> please wait....</h1>;
  } else
    return (
      <>
        {openModal && signupvalue && (
          <Modal open={true} onClose={closeHandler} isSignupModal={true} />
        )}
        {openModal && loginvalue && (
          <Modal open={true} onClose={closeHandler} isLoginModal={true} />
        )}
        {openModal && productvalue && (
          <Modal open={true} onClose={closeHandler} isProductModal={true} />
        )}
        <Nav />

        <main className={homecss.image_product_main_block}>
          <section className={homecss.image_text_block_dashboard}>
            <img src={imgs} alt="" srcSet="" className={homecss.image} />

            <section className={homecss.text_main_block}>
              <header className={homecss.heading1}>
                Add your of products and give your valuable feedback
              </header>
              <article className={homecss.article1}>
                Easily give your feedback in a matter of minutes. Access your
                audience on all platforms. Observe result manually in real time
              </article>
            </section>
          </section>

          <section className={homecss.product_feedback_block}>
            <section className={homecss.feedback_appy_fillter_main}>
              <div className={homecss.feedback_appy_fillter_block1_main}>
                <section className={homecss.feedback_apply_filter}>
                  <div>Feedback</div>
                  <div>
                    <section>
                      Apply<span>Filter</span>{" "}
                    </section>
                  </div>
                </section>
              </div>
              <div className={homecss.feedback_appy_fillter_block2}>
                {getDataFromBackend.map((item, ind) => {
                  return (
                    <div
                      key={ind}
                      className={homecss.feedback_appy_fillter_block2_fillter}
                    >
                      {" "}
                      {item.product_name}
                    </div>
                  );
                })}

                {array_from_redux.length
                  ? array_from_redux.map((item, ind) => {
                      return (
                        <div
                          key={ind}
                          className={
                            homecss.feedback_appy_fillter_block2_fillter
                          }
                        >
                          {" "}
                          {item.product_name}
                        </div>
                      );
                    })
                  : ""}
              </div>
            </section>

            {/* main product  block */}
            <section className={homecss.product_block3}>
              <main className={homecss.suggestion_upvote_addproduct_main_block}>
                {/* upvote sorting block */}
                <section className={homecss.suggestion_upvote_block}>
                  <div className={homecss.suggestion_upvote_block1}>
                    <span className={homecss.suggestion_upvote_block2}>
                      {getDataFromBackend.length}
                    </span>
                    <p className={homecss.suggestion_upvote_block3}>
                      Suggestions
                    </p>
                  </div>

                  <section className={homecss.suggestion_upvote_block4}>
                    <span className={homecss.suggestion_upvote_block6}>
                      sort by
                    </span>
                    <p
                      className={homecss.suggestion_upvote_block7}
                      onClick={votechange}
                    >
                      Upvotes
                    </p>
                    {upvote ? (
                      <AiOutlineUp
                        className={homecss.suggestion_upvote_block8}
                        onClick={votechange}
                      />
                    ) : (
                      <AiOutlineDown
                        className={homecss.suggestion_upvote_block8}
                        onClick={votechange}
                      />
                    )}
                  </section>
                </section>

                {/* add product button */}
                <div className={homecss.suggestion_button_icon_block}>
                  <button
                    className={homecss.suggestion_button_products}
                    onClick={add_product}
                  >
                    + Add product
                  </button>
                </div>
              </main>

              {/* sabsay main block jha list show hoga company ka */}

              <main className={homecss.products_list_head_block}>
                {array_from_redux.length
                  ? array_from_redux.map((item, index) => {
                      return (
                        <Listcreate items={item} index={index} key={index} />
                      );
                    })
                  : ""}

                {upvote
                  ? getDataFromBackend.map((item, index) => {
                      return (
                        <Listcreate items={item} index={index} key={index} />
                      );
                    })
                  : getDataFromBackend.map((item, index) => {
                      return (
                        <Listcreate items={item} index={index} key={index} />
                      );
                    })}
              </main>
            </section>
          </section>
        </main>
      </>
    );
};

export default Homepage;
