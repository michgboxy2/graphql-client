import React, {useState, useEffect} from 'react';
import fetchTweets   from '../../queries/fetchTweets';
import {graphql} from 'react-apollo';

const TweetList = (props) => {
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        setTweets(props.data.tweets);
    }, [props.data.tweets]);

    
    // console.log(props.data.tweets);

   if(tweets){
       return tweets.map(tweet => {
           return(
            <ul>
            <li>{tweet.tweet}</li>
        </ul>
           )
       })
   }else {
    return (
        <div>
            <ul>
                <li>holla</li>
            </ul>
        </div>
    ) 
   }
    
   
}

export default graphql(fetchTweets)(TweetList);