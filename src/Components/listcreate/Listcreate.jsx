import { useState, useEffect } from "react";
import listcss from "./List.module.css";
import { AiOutlineUp } from "react-icons/ai";
import { TbMessageCircle } from "react-icons/tb";
import { BsChatRightFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import axios from "axios";
const Listcreate = ({ items, index }) => {
  let takeindex = "list" + String(index);

  const [commentshow, setcommentshow] = useState({ [takeindex]: false });
  let getting_id = items._id;
  const [take_data_from_homepage, setTake_data_from_home_page] = useState({
    ...items,
  });
  const [comment_text_take, setComment_text_set] = useState("");
  const open_drop_down = (e) => {
    setcommentshow((old_data) => {
      return { takeindex: !old_data.takeindex };
    });
  };

  const voting_count_increment = async (e) => {
    console.log(e.target);

    if (getting_id !== undefined) {
      let data = await axios.post("https://cuvvete-backend.onrender.com/update_voting", {
        _id: getting_id,
      });

      if (data.data) setTake_data_from_home_page(data.data);
    }
  };

  const sumbit_comment = async (e) => {
    try {
      let data = await axios.post("https://cuvvete-backend.onrender.com/comment", {
        _id: getting_id,
        comment: comment_text_take,
      });

      setComment_text_set("");

      setTake_data_from_home_page(data.data);
    } catch (error) {
      alert(error);
    }
  };

  const changes = (e) => {
    setComment_text_set(e.target.value);
  };

  useEffect(() => {}, []);

  if (Object.keys(take_data_from_homepage).length === 0) {
    return <h1> please wait....</h1>;
  } else {
    return (
      <>
        <main className={listcss.main_block1} key={index}>
          <div className={listcss.image_text_voting_block}>
            <div className={listcss.image_text_main_blocks}>
              <img
                src={take_data_from_homepage.imgurl}
                alt=""
                className={listcss.image}
              />

              <section className={listcss.heading_paragraph_block}>
                <div className={listcss.heading}>
                  {take_data_from_homepage.name}
                </div>
                <div className={listcss.paragraphs}>
                  {take_data_from_homepage.desc}
                </div>
              </section>
            </div>
            <div className={listcss.voting_main_block}>
              <section className={listcss.voting_icon_and_uparrow_block}>
                <div id={take_data_from_homepage._id}>
                  <AiOutlineUp
                    className={listcss.voting_icon}
                    id={take_data_from_homepage._id}
                    onClick={voting_count_increment}
                  />
                </div>

                <span
                  id={take_data_from_homepage._id}
                  onClick={voting_count_increment}
                >
                  {take_data_from_homepage.voting_count}
                </span>
              </section>
            </div>
          </div>

          <section className={listcss.comment_message_edit_main_block}>
            <div className={listcss.comment_three_block}>
              <div className={listcss.comment_product}>
                {take_data_from_homepage.product_name}
              </div>
              <div className={listcss.comment_category}>
                {take_data_from_homepage.category}
              </div>

              <span className={listcss.comment_block} id={items.name}>
                <span onClick={open_drop_down}>
                  <TbMessageCircle className={listcss.comment_icon} />
                </span>

                <span
                  className={listcss.comment_text}
                  id={`${index}+${take_data_from_homepage.name}`}
                  onClick={open_drop_down}
                >
                  Comment
                </span>
              </span>
            </div>
            <div className={listcss.editing_comment_chat_block}>
              <div className={listcss.editing_comment_chat_edit_btn}>Edit</div>
              <span className={listcss.editing_comment_chat_text}>
                {take_data_from_homepage.comment.length}
              </span>
              <BsChatRightFill className={listcss.editing_comment_chat} />
            </div>{" "}
            {/* ea edit button message ki icon or kitne message ha ushka number wala block ha */}
          </section>
        </main>

        {commentshow.takeindex ? (
          <section className={listcss.take_input_for_Adding_comment_main_block}>
            <form className={listcss.take_input_icon_box}>
              <input
                type="text"
                placeholder="Add a Comment..."
                value={comment_text_take}
                onChange={changes}
              />
              <span id={take_data_from_homepage._id}>
                <IoMdSend
                  id={take_data_from_homepage._id}
                  className={listcss.iconss}
                  onClick={sumbit_comment}
                />
              </span>
            </form>

            {take_data_from_homepage.comment.map((itemss, ind) => (
              <ul key={ind}>
                <li className={listcss.list_itemss}>{itemss}</li>
              </ul>
            ))}
          </section>
        ) : (
          ""
        )}
      </>
    );
  }
};

export default Listcreate;
