import React, { Component } from 'react';
import { Query } from "react-apollo";
import GET_PARTICIPANTS_DETAILS from '../apollo/get_participants_details';
import ParticipantsDashboard from '../container/ParticipantsDashboard';


// const GeneralInfo = styled('div')`
//   width: 100vw;
//   height: 90vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding-top: 5vh;
// `;

class TripDetails_page extends Component {

  render() {
    const tripID = this.props.location.pathname.split('/')[2];
    const ParticipantsDetailsApollo = () => (
      <Query
      query={GET_PARTICIPANTS_DETAILS}
      errorPolicy="all"
      variables ={{tripID : tripID}}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) console.log(error);
        if (data.trip) {
          return (
            <div>
              <ParticipantsDashboard info={data}/>
          </div>
          );
        }
        else if (!data.trip) {
          return (
            <h1>
              Sorry, trip not found
            </h1>
          )
        }
      }
    }
    </Query>
    );
    return (
      <ParticipantsDetailsApollo />
    );
  }
}

export default TripDetails_page

/*
  Here we should go knowing both the user id and the trip id. We will get from the db:
  on schema:
    - name,
    - participants,
    - destination.
    - budget,
    - timeFrame

  should the id it will try to fetch from graphql should come from the url -> allow for direct access to the url and
  independence
*/