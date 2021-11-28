import {useState, useEffect} from 'react'
import axios from 'axios'
import {v4} from 'uuid'

function childrenRender(item) {
  if(item.children) {
    return <ul>{item.children.map((childItem,index) => <List item={childItem} key={index} />)}</ul>
  }
}

function onClickReply(item,text) {
  if(!text) {
    alert('Please enter some text above textarea')
  } else if(item.children){
    item.children.unshift({_id: v4(), comment: text})
  } else {
    item['children'] = []
    item.children.unshift({_id: v4(), comment: text})
  }
}

const List = ({item}) => {
  const [text,setText] = useState()
  const [flag,setFlag] = useState(true)

  return (
    <li className="childBox">
      <div className="divStyle1">
        <div className="divStyle2">
          {flag ? <>{item.comment}
            <div className="divStyle3">
              <textarea className="textarea" value={text} onChange={(e) => setText(e.target.value)} />
              <button className="replyButton" onClick={() => {
                onClickReply(item,text)
                setText('')
              }}>Reply</button><br/>  
            </div></> : null }
        </div>
        <button className="hideButton" onClick={() => setFlag((prev) => !prev)}>{flag ? 'Hide' : 'Show'} Comment</button>
      </div>
      {childrenRender(item)}
    </li>
  )
}



function App() {
  const [apiData,setApiData] = useState()
  useEffect(() => {
    axios.get('https://www.mocky.io/v2/5dc596503200008200769be8/').then((res) => {
      setApiData(res.data)
    }).catch((e) => {
      console.log(e)
    })
  },[])

  return (
    <ul>
      {apiData && apiData.map((item,index) => <List item={item} key={index} />)}
    </ul>
  );
}

export default App;