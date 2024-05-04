import React, { useEffect, useState } from "react";
import Column from "./column";
import "./content.css"
import { data } from "../../data";
import _, { cloneDeep, includes, map, isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { DndContext, PointerSensor, useSensor, useSensors, DragOverlay, defaultDropAnimation, defaultDropAnimationSideEffects,closestCorners } from '@dnd-kit/core';
import { SortableContext, defaultAnimateLayoutChanges, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { arrayMove } from '@dnd-kit/sortable';
import { generatePlaceholderCard } from "../../untils/formaters";
import axios from "axios";

import Card from "./card";


const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
    CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}






const Content = () => {
    const [isAddColumn, setIsAddColumn] = useState(false);
    const [columns, setColumns] = useState([]);
    const [columnName, setColumnName] = useState("");
    const [oderedColumnState, setOrderedColumnState] = useState([]);
    //tai mot thoi diem chi co 1 phan tu dang duoc keo( column or card)
    const [activeDragItemId, setActiveDragItemId] = useState(null);
    const [activeDragItemType, setActiveDragItemType] = useState(null);
    const [activeDragItemData, setActiveDragItemData] = useState(null);
    const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null);
    const [boardId, setBoardId]= useState(null)
    // const boardId= Number(localStorage.getItem("boardId"))
    // const queryString = window.location.search;

    // const params = new URLSearchParams(queryString);
    //   setBoardId(params.get('boardId'));
    useEffect(()=>{
         const queryString = window.location.search;

    const params = new URLSearchParams(queryString);
      setBoardId(params.get('boardId'));
      getData()

    },[boardId])



    const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })  //yeu cau di chuyen chuot 10px thi moi kich hoat event dndCOntext, fix trương hop click bi goi event lam mat chuc nang
    const mySensors = useSensors(pointerSensor)
    // useEffect(() => {
    //     getData()

    // }, [])

    const getData= async()=>{
       await axios.get(`http://localhost:3001/board/find-board-by-id/${boardId}`).then(res=>{
        if(res.data){
            
            setColumns(res.data.cols)
        }


        })
    }

    const setDataColumn=async (column)=>{

       await axios.put(`http://localhost:3001/table/update-column-by-id/${column.columnId}`,column).then(res=>{
            if(res.data){
                console.log("update column active sucessful")
            }


        })


    }
   


    // useEffect(() => {

    //     // console.log("columns:",columns)
    // }, [columns])

    const setColumnDataByColumnId=(column)=>{

        const newColumns=cloneDeep(columns)
        const index= newColumns.findIndex(c=>c.id===column.id)
        newColumns[index].cards=column.cards
        setColumns(newColumns)
        
    }




    const handelAddList = () => {

        setIsAddColumn(false);
        let sort= columns.length 
        console.log("sort:", sort)
        axios.post("http://localhost:3001/table/create-column" ,{columnName,boardId,sort}).then(res=>{
            if(res.data){

                axios.get(`http://localhost:3001/board/find-board-by-id/${boardId}`,{boardId}).then(res=>{
                    if(res.data){
                        setColumns(res.data.cols)
                        // console.log("colums:", res.data.cols)
                    }
            
            
                    })
            }

        })
    }

    const columnDel =async (column) => {
        const columnId= column.columnId
        if(columnId){
         await axios.delete(`http://localhost:3001/table/del-column/${columnId}`, {columnId})

       await axios.get(`http://localhost:3001/board/find-board-by-id/${boardId}`,{boardId}).then(res=>{
                    if(res.data){
                        setColumns(res.data.cols)
                        console.log("colums:", res.data.cols)
                    }
            
            
                    })

        }
    
    }
    const findColumnByCardId = (cardId) => {

        return columns.find(column => column?.rows?.map(card => card.rowId)?.includes(cardId)) // map ra một mảng card sau đó include xem có cardId trong đó thì trả về column ở trước 


    }

    const handleDragStart = (event) => {

        // console.log('HandleDragStart:', event)
        setActiveDragItemId(event?.active?.id)
        setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.COLUMN : ACTIVE_DRAG_ITEM_TYPE.CARD)
        setActiveDragItemData(event?.active?.data?.current)

        //neu la keo card thi moi thuc hien hanh dong setOldColumn
        if (event?.active?.data?.current?.rowId) {
            setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))

        }


    }


    const handleDragOver = async(event) => { //over chi keo tu cot ben nay sang ben kia va xoa cung nhu them phan tu o hai cot tuong ung. xu ly du lieu sau khi tha la cua dragEnd
        //khong lam gi neu dang keo column
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

        // console.log("OnDragOver:",event);
        
        //neu keo card thi xu ly them de co the keo tha qua lai giua cac column
        const { active, over } = event
        if(active.id===over.id) return;

        if (!active || !over) return // neu keo tha ra ngoai tra ve luon tranh crash trang
        const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active //Lay du lieu va dat ten moi cho du lieu cua active
        const { id: overCardId } = over


        //tim 2 cai column theo 2 cardId
        const activeColumn = findColumnByCardId(activeDraggingCardId)
        const overColumn = findColumnByCardId(overCardId)
        // console.log("activeColumn:", activeColumn)
        // console.log("overColumn:", overColumn)

        if (!activeColumn || !overColumn) return
        //keo khac column thi moi chay
        if (activeColumn.columnId !== overColumn.columnId) {
            setColumns(prevColumn => {
                //tim vi tri cua overcard trong column dich(noi card se duoc tha)
                const overCardIndex = overColumn?.rows?.findIndex(card => card.rowId === overCardId)
                
                const isBelowOverItem = active.rect.current.translated && // tinh toan vi tri tren duoi cua overItem(noi the duoc tha, rect.top, rect.height la thuoc tinh vi tri cua the doi voi khung hinh trong du lieu tra ve)
                    active.rect.current.translated.top > over.rect.top + over.rect.height;

                const modifier = isBelowOverItem ? 1 : 0
               const newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.rows?.length + 1

                console.log("newCardIndex:",newCardIndex)
                activeDraggingCardData.sort= newCardIndex
                const nextColumns = cloneDeep(prevColumn)
                const nextActiveColumn = nextColumns.find(column => column.columnId === activeColumn.columnId)
                const nextOverColumn = nextColumns.find(column => column.columnId === overColumn.columnId)
                if (nextActiveColumn) {
                    //xoa card o bang cu sau khi da keo sang bang moi. ham filter se tra ve mot column thoa man dieu kien
                    nextActiveColumn.rows = nextActiveColumn.rows.filter(card => card.rowId !== activeDraggingCardId)
                }

                if (nextOverColumn) {
                    
                  
                    nextOverColumn.rows = nextOverColumn.rows.filter(card => card.rowId !== activeDraggingCardId)
                    console.log("activeDraggingCardDataSort", activeDraggingCardData.sort)
                    
                    
                    nextOverColumn.rows = nextOverColumn.rows.toSpliced(newCardIndex, 0, activeDraggingCardData)
                    console.log("nextOverColumn:",nextOverColumn)
                  
                    

                }

                // console.log("nextcolumns:", nextColumns)
                return nextColumns


            })
        }


    }





    const handleOnDragEnd= async (event)=>{
        console.log("dragend:", event)
        const{active, over}=event
        if (!active || !over) return;
        
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
            const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active //Lay du lieu va dat ten moi cho du lieu cua active
            const { id: overCardId } = over


            //tim 2 cai column theo 2 cardId
            const activeColumn = findColumnByCardId(activeDraggingCardId)
            const overColumn = findColumnByCardId(overCardId)

            if (!activeColumn || !overColumn) return
            // console.log('oldColumnWhenDraggingCard:', oldColumnWhenDraggingCard)
            // console.log('overColumn:',overColumn)
            if (oldColumnWhenDraggingCard.columnId !== overColumn.columnId) {
                //keo tha trong 2 column
                // console.log("keo tha 2 column ")
                setColumns(prevColumn => {
                    //tim vi tri cua overcard trong column dich(noi card se duoc tha)
                    const overCardIndex = overColumn?.rows?.findIndex(card => card.rowId === overCardId)
                    let newCardIndex
                    const isBelowOverItem = active.rect.current.translated && // tinh toan vi tri tren duoi cua overItem(noi the duoc tha, rect.top, rect.height la thuoc tinh vi tri cua the doi voi khung hinh trong du lieu tra ve)
                        active.rect.current.translated.top > over.rect.top + over.rect.height;
    
                    const modifier = isBelowOverItem ? 1 : 0
                    newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.rows?.length + 1
                    const nextColumns = cloneDeep(prevColumn)
                    const nextActiveColumn = nextColumns.find(column => column.columnId === oldColumnWhenDraggingCard.columnId)
                    const nextOverColumn = nextColumns.find(column => column.columnId === overColumn.columnId)
                    // console.log("nextActiveColumn:",nextActiveColumn)
                    // console.log("nextOverColumn:", nextOverColumn)
                    if (nextActiveColumn) {
                        //xoa card o bang cu sau khi da keo sang bang moi. ham filter se tra ve mot column thoa man dieu kien
                        nextActiveColumn.rows = nextActiveColumn.rows.filter(card => card.rowId !== activeDraggingCardId)
                        // console.log("nextActiveColumn:",nextActiveColumn)


                        //lam cach nao de ca nhung column moi tao cung co card FE nay chu khong chi la nhung column bi keo het the
                        // if (isEmpty(nextActiveColumn.cards)){//neu khong con the trong column thi tao mot the FE_Placeholder tam thoi de giu cho keo tha
                                
                        //        nextActiveColumn.cards= [generatePlaceholderCard(nextActiveColumn)] //ham tao 1 the tam thoi co thuoc tinh Fe_PlaceholderCard de keo tha khi khong co card trong column
                               
                        // }
                    
                    }
    
                    if (nextOverColumn) {
                        nextOverColumn.rows = nextOverColumn.rows.filter(card => card.rowId !== activeDraggingCardId)
                        
                        nextOverColumn.rows = nextOverColumn.rows.toSpliced(newCardIndex, 0, activeDraggingCardData)
                        // console.log(nextOverColumn)
                        
                        //neu co card duoc keo lai thi xoa nhung cai the co thuoc tinh FE_Placeholder di de du lieu hien thi chinh xac nhu binh thuong
                        // nextOverColumn.cards=nextOverColumn.cards.filter(card =>!card.FE_PlaceholderCard)
    
                    }
                    
                    // console.log("nextcolumns:", nextColumns)
                    return nextColumns
    
    
                })



            } 
            else {

                //keo tha trong cung 1 column

                //lay vi tri cu(tu oldWhenDraggingCard)
                const oldCardIndex = oldColumnWhenDraggingCard?.rows?.findIndex(c => c.rowId === activeDragItemId) //lay vi tri cu tu active
                const newCardIndex = overColumn?.rows?.findIndex(c => c.rowId === overCardId) //lay vi tri moi tu over

                const orderCard = arrayMove(oldColumnWhenDraggingCard?.rows, oldCardIndex, newCardIndex)
                // console.log("orderCard:",orderCard)
                setColumns(prevColumn => {

                    const nextColumns = cloneDeep(prevColumn)
                    const targetColumn = nextColumns.find(c => c.columnId === overColumn.columnId)
                    targetColumn.rows = orderCard;
                    // console.log("targetColumn:", targetColumn)
                    return nextColumns
                })
                 
        if(orderCard){
            orderCard.map((card,index)=>{
             card.sort=index
            })

                await axios.put("http://localhost:3001/table/update-row", orderCard).then(res=>{

                if(res.data){

                    // getData()
                }
                })
                




            }
        }
        }

        else {
        if(active.id !==over.id){
            // console.log("keo tha hai cot")
        }
        const oldIndex= columns.findIndex(c=>c.columnId===active.id);

        const newindex= columns.findIndex(c=>c.columnId===over.id); 
        const moveColumn= arrayMove(columns,oldIndex,newindex)
        
        if(moveColumn){
       moveColumn.map((column,index)=>{
        column.sort=index


       })
    //    console.log("movecolumn:", moveColumn)
                    
        setColumns(moveColumn)
       await axios.put("http://localhost:3001/table/update-column", moveColumn).then(res=>{

        console.log(res.data)
        })



    
    
}
        }

setActiveDragItemId(null)
setActiveDragItemType(null)
setActiveDragItemData(null)
setOldColumnWhenDraggingCard(null)

    }   

        
    
  
    
    return (
        <DndContext
            sensors={mySensors}
            // collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleOnDragEnd}
        >

            <div className="content" style={{backgroundColor:"aliceblue"}}>

            {/* props cua dragoverlays  */}
                <SortableContext items={columns?.map(c => c.columnId)} strategy={horizontalListSortingStrategy}>
                    <div className="list-column" >
                        {/* <DragOverlay dropAnimation={customDropAnimation}> 
                            
                            {(!activeDragItemType) && null}
                            {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}></Column>}
                            {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData}></Card>}


                        </DragOverlay> */}
                        {columns && columns.length > 0 && columns.sort((a,b)=>(a.sort-b.sort)).map((column, index) => {
                            console.log("columnprint:",column)
                                
                            return (
                                <Column
                                    key={column.columnId}
                                    column={column}
                                    columnDel={() => columnDel(column)}
                                    setColumnDataByColumnId={()=> setColumnDataByColumnId(column)}
                                     getData={getData}/>
                            )
                        }


                        )

                        }

                        <div className="add-list-area">
                            {isAddColumn === false ?

                                <div className="add-new-column" onClick={() => setIsAddColumn(true)}>
                                    <i className="fa fa-plus icon-add-list"></i>
                                    Add another list
                                </div>

                                :
                                <div className="content-add-column">
                                    <div className="text-area-add-column">
                                        <textarea className="input-value-column" placeholder="Enter the list title" onChange={(e) => setColumnName(e.target.value)}>
                                        </textarea>
                                    </div>
                                    <div className="button-add-column">
                                        <button className="btn-add" onClick={handelAddList}>Add List</button>
                                        <i className="fa fa-times icon-cancel" onClick={() => setIsAddColumn(false)}></i>

                                    </div>


                                </div>
                            }
                        </div>
                    </div>
                </SortableContext>

            </div>
        </DndContext>






    )
                        }
                        

export default Content;