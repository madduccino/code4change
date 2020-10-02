import React from 'react';
import Firebase from 'firebase';

class Results extends React.Component{
constructor(props) {
   super(props);
   this.state = {
       submissions: []
   }
}

componentDidMount() {
  this.getData()
}

// getData = () => {
//     let ref = Firebase.database().ref("/submissions");
//     ref.on("value", snapshot => {
//       let allSubmissions = [];
//       snapshot.forEach(snap => {
//         allSubmissions.push(snap.val());

//       });
//       this.setState({ submissions: allSubmissions }, this.mapData);

//     }) 
   

//   };


getData = () => {
    const db = Firebase.database().ref('/submissions');
    db.on('value', snapshot => {
        let data = []   

        snapshot.forEach(snap => {
            data.push(snap.val())
        })  
    
data.sort((a, b) => b.votes - a.votes);
console.log("sorted",data)

    console.log(data)
    this.setState({
        submissions : data
    }, this.logData)
});
}

logData() {
}

sortData() {
   this.state.submissions.map(submission => {
     
  })
}
    
  render() {
    let count=1

    return(
    <React.Fragment>
               <h1>Results</h1>
    {this.state.submissions.map(submission => (
          <div class="results"> 
          
           <h3>{count++}. {submission.projName}</h3>
           <div>
           <p>{submission.firstName} {submission.lastName}</p>
           <p><a href={submission.url}>View Project</a></p>
           <p>Votes: {submission.votes}</p>
           </div>
         </div>
     ))}


     
    </React.Fragment>

    )}
}

  export default Results