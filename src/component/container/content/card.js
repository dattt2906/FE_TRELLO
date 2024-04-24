import "./card.css"
import { useState,useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
const Card=(props)=>{
    const {card, cardDel}=props;
    const [isShowEditCard, setIsShowEditCard]= useState(false);
    const {
      attributes,listeners,setNodeRef,transform,transition, isDragging} = useSortable({
          id:card.rowId,
          data:{...card}})
    const dndKitCardStyles = {
      transform: CSS.Translate.toString(transform), //css.translate thi khi keo tha se giu nguyen kich thuoc trong khi dang keo ma khong gap loi hien thi
      transition,
      opacity:isDragging ? 0.5 : undefined,
      border:isDragging ? "1px solid #3498db" :undefined,
      opacity : card?.FE_PlaceholderCard ? "0":"1",
      height: card?.FE_PlaceholderCard ? "0px":"unset"
     

    };

    const[changeContentCard,setChangeContentCard]= useState(card.content);
    useEffect(()=>{
      if(changeContentCard){
          card.content=changeContentCard;
      }
    },[changeContentCard])
    
    return(
            <>
            <div className="card"
             ref={setNodeRef}
             style={dndKitCardStyles}
             {...attributes}
             {...listeners}>
               <input className="change-content" value={changeContentCard} onChange={(e)=>setChangeContentCard(e.target.value)}></input>
               <i class="fa fa-pencil icon-edit-card" onClick={()=> setIsShowEditCard(true)}></i>
            </div>
            
            {!isShowEditCard===false ?
            <div className="conntent-edit-card">
            <button className="icon-delete" onClick={()=>cardDel(card)}> Delete</button>
            <button className="icon-save" onClick={(e)=>setChangeContentCard(e.target.value)}>Save</button>
            <i className="fa fa-times icon-cancel-edit" onClick={()=> setIsShowEditCard(false)}></i>
  
            </div>
            :
            <div></div>
          }
            </>

    )

}
export default Card;