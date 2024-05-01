import Card from "./card";
import "./column.css"
import { useState, useEffect, useRef } from 'react';
import _, { cloneDeep, flatMap } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import axios from "axios";


const Column = (props) => {
  const { column, columnDel, setColumnDataByColumnId, getData } = props;
  const cards = column.rows;
  console.log("cards:" , cards)
  const [Cards, setCards] = useState(cards);
  // console.log("Cards", Cards)
  const columnId = column.columnId


  useEffect(() => {

    setCards(cards) //moi khi cards duoc thay doi thi luu cards moi vao vi neu chi thay doi ben column thi cards se khong the biet su thay doi do

  }, [cards])

  const {
    attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
      id: column.columnId,
      data: { ...column }
    })
  const dndKitColumnStyles = {
    transform: CSS.Translate.toString(transform), //css.translate thi khi keo tha se giu nguyen kich thuoc trong khi dang keo ma khong gap loi hien thi
    transition,
    height: "fit-content",
    opacity: isDragging ? 0.5 : undefined // loi hien thi mo o day

  };
  const [isShowAddCard, setIsShowAddCard] = useState(false);
  const [content, setContent] = useState("");


  const handleAddCard = async () => {

    // const addcard = _.cloneDeep(Cards);
    // addcard.push({
    //   id:uuidv4(),
    //   content: content,
    //   columnId:column.id

    // });
    let sort= Cards.length
    await axios.post("http://localhost:3001/table/create-row", { content, columnId,sort }).then(res => {
      if (res.data) {

        axios.get(`http://localhost:3001/table/find-column-by-id/${columnId}`).then(res => {
          if (res.data) {
            setCards(res.data.rows)
            getData()
          }



        })
      }

    })

    // setCards(addcard)
    setIsShowAddCard(false)
    // column.cards=
    // setColumnDataByColumnId(column)


  }

  const cardDel = async (card) => {

    const rowId= card.rowId
    if(rowId){
     await axios.delete(`http://localhost:3001/table/del-row/${rowId}`, {rowId})

   await axios.get(`http://localhost:3001/table/find-column-by-id/${columnId}`,{columnId}).then(res=>{
                if(res.data){
                    setCards(res.data.rows)
                }
        
        
                })

    }

    // let newCard = [...Cards];
    // const index = newCard.findIndex(item => item.id === card.id);
    // newCard.splice(index, 1);
    // setCards(newCard);
    // column.cards = newCard
    // setColumnDataByColumnId(column)

  }
  //Khi cac gia tri cua column thay doi thi column.title duoc gan cho changTitle
  const [changeColumnTitle, setChangeColumnTitle] = useState(column.columnName);
  useEffect(() => {
    if (changeColumnTitle) {
      column.columnName = changeColumnTitle;
    }
  }, [changeColumnTitle])




  return (
    <>

      <div className="column"
        ref={setNodeRef}
        style={dndKitColumnStyles}
        {...attributes}
        {...listeners}
      >
        <div className="column-name">
          <input className="change-title" type="text" value={changeColumnTitle} onChange={(e) => setChangeColumnTitle(e.target.value)}>
          </input>
          <i class="fa fa-trash icon-del-column" onClick={() => columnDel(column)}></i>
        </div>
        <SortableContext items={Cards?.map(c => c.rowId)} strategy={verticalListSortingStrategy}>
          <div className="list-card">
            {Cards && Cards.length > 0 && Cards.sort((a,b)=>(a.sort-b.sort)).map((card, index) => {
              // console.log(card)
              return (
                <Card
                  key={card.rowId}
                  card={card}
                  cardDel={() => cardDel(card)}
                ></Card>
              )
            })
            }








            {isShowAddCard === false ?
              <footer onClick={() => setIsShowAddCard(true)}>
                <i className="fa fa-plus icon-plus-card"></i>
                Add another card</footer>
              :
              <div className="content-add-card">
                <div className="text-area-add-card">
                  <textarea className="input-value-card" placeholder="Enter the content card" onChange={(e) => setContent(e.target.value)}>
                  </textarea>
                </div>
                <div className="button-add">
                  <button className="btn-add" onClick={handleAddCard}>Add card</button>
                  <i className="fa fa-times icon-cancel-card" onClick={() => setIsShowAddCard(false)}></i>

                </div>


              </div>
            }


          </div>
        </SortableContext>

      </div>


    </>


  )


}
export default Column;