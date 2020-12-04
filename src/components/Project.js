import React from 'react';
import Firebase from 'firebase';
import Spinner from 'react-spinkit';

class Project extends React.Component{
  
  constructor(props) {
    super(props);
    this.state = {
      submissions: [],
      firstName: '',
      id:  this.props.match.params,
      loading: true
    }
    this.getData = this.getData.bind(this);
    this.mapData = this.mapData.bind(this);

  };

  hideSpinner = (e) => {
    e.preventDefault()
    window.scrollTo(0, 200);
    this.setState({
      loading: false
    });
    console.log('loaded')
  };

    componentDidMount() {
      window.scrollTo(0, 200);
      console.log(this.state)
      // const id = this.props.match.params;
      // const firstName = this.props.location.firstName;
      // const grade = this.props.location.grade;
      // const projName = this.props.location.projName;
      // const desc = this.props.location.desc;
      // const sdg = this.props.location.sdg;
      // const age = this.props.location.age;
      // const url = this.props.location.url;
      // const teamName = this.props.location.teamName;

      this.getData()
    }

    
    getData = () => {
      let ref = Firebase.database().ref("/submissions");
      ref.on("value", snapshot => {
        let allSubmissions = [];
        snapshot.forEach(snap => {
          allSubmissions.push(snap.val());

        });
        this.setState({ submissions: allSubmissions }, this.mapData);

      }) 
     

    };


  mapData = () => {
      const id = this.props.match.params.id;
      console.log(id)
      let firstName = '';
      let age = '';
      let grade = '';
      let url = '';
      let teamName = '';
      let desc = '';
      let sdg = '';
      let projName = '';
      this.state.submissions.map(submission=> {
        const db = Firebase.database();
        db.ref('/submissions').orderByChild('uid').equalTo(id).once("value", function(snapshot) {
          snapshot.forEach((child) => {
           console.log(child.val().firstName)
           firstName = child.val().firstName
           age = child.val().age
           grade = child.val().grade
           url = child.val().url
           teamName = child.val().teamName;
           desc = child.val().desc;
           sdg = child.val().sdg;
           projName = child.val().projName;


     });
           
   })
   
 })      
 this.setState({
   firstName: firstName,
   age: age,
   grade: grade,
   url: url,
   desc: desc,
   teamName: teamName,
   sdg: sdg,
   projName: projName
  
  })

  };


  waitToRender() {
 
  }

    render() {

      return(
        <div>

      <div id="project">    
          
        <div id="the-project">
        {this.state.loading ? (
       
       <Spinner name="pacman" className="text-center" color="purple" />
                 ) : null}
          <iframe width="485" height="402" src={this.state.url} onLoad={this.hideSpinner}></iframe>
          <p className="center"><a target="_blank" href={this.state.url}>View in Full Screen</a></p>
        </div>
        <div id="about">
        <h2>Coder Profile</h2>
           <p><strong>Name(s):</strong> {this.state.firstName}</p>
          {this.state.teamName && ( <p><strong>Team Name:</strong> {this.state.teamName}</p>)}
         <p><strong>Age(s):</strong> {this.state.age}</p>
           <p><strong>Grade(s):</strong> {this.state.grade}</p>
         </div>
        

      </div>
       <About projName={this.state.projName} desc={this.state.desc} sdg={this.state.sdg} /> 

        </div>
  
  //       <div id="project">        
  //       <button onClick={this.logState}>Click</button>

  //        <h1 id="title">{this.state.projName}</h1>
  //        <div id="project-content">
  //         <div id="project">
   



  //           <iframe width="485" height="402" src={this.state.url} onLoad={this.hideSpinner}></iframe>
  //           <p className="center"><a target="_blank" href={this.state.url}>View in Full Screen</a></p>

  //         </div>
  //         <div id="about">
  //           <h2>Profile</h2>
  //           <p><strong>Name(s):</strong> {this.state.firstName}</p>
  //           <p><strong>Team Name:</strong> {this.state.teamName}</p>
  //           <p><strong>Age(s):</strong> {this.state.age}</p>
  //           <p><strong>Grade(s):</strong> {this.state.grade}</p>
  //         </div>
  //        </div>
  //        <div id="about-project" className="tan">
  //         <h2>About the Project</h2>
  //         <p><strong>Description:</strong> {this.state.desc}</p>
  //         <p><strong>Sustainable Development Goal:</strong> {this.state.sdg}</p>
  //         <div><a href="/">Back</a></div>

  //         </div>
  //       </div>
      
  
  
  )
    }


    

}

class About extends React.Component {
  constructor(props) {
    super(props);
    
 }
render() {
  return(
 <div id="about-project">
 <h2>About the Project</h2>
 <p><strong>Name:</strong> {this.props.projName}</p>

 <p><strong>Description:</strong> {this.props.desc}</p>
 <div><a href="/">Back</a></div>

 </div> 
  )
}

}

export default Project;
