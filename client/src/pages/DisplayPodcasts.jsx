import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPodcastByCategory, getMostPopularPodcast } from '../api/index.js';
import styled from 'styled-components';
import { PodcastCard } from '../components/PodcastCard.jsx';
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/snackbarSlice";
import { displayPodcastFailure } from '../redux/userSlice.jsx';
import { CircularProgress, Button } from '@mui/material';

const DisplayMain = styled.div`
  display: flex;
  padding: 30px 30px;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
`;
const Topic = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  font-weight: 540;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Podcasts = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  gap: 10px;
  padding: 30px 0px;
`;
const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
  padding: 20px;
  border-radius: 6px;
  min-height: 400px;
`;
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const DisplayNo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  color: ${({ theme }) => theme.text_primary};
`;

const DisplayPodcasts = () => {
    const { type } = useParams();
    const [podcasts, setPodcasts] = useState([]);
    const [string, setString] = useState("");
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [controller, setController] = useState(null);

    const mostPopular = async (signal) => {
        await getMostPopularPodcast({ signal })
            .then((res) => {
                setPodcasts(res.data);
            })
            .catch((err) => {
                if (err.name !== 'AbortError') {
                    dispatch(
                        openSnackbar({
                            message: err.message,
                            severity: "error",
                        })
                    );
                }
            });
    };

    const getCategory = async (signal) => {
        await getPodcastByCategory(type, { signal })
            .then((res) => {
                setPodcasts(res.data);
            })
            .catch((err) => {
                if (err.name !== 'AbortError') {
                    dispatch(
                        openSnackbar({
                            message: err.message,
                            severity: "error",
                        })
                    );
                }
            });
    };

    const getAllPodcasts = async () => {
        if (controller) {
            controller.abort();
        }
        const newController = new AbortController();
        setController(newController);

        if (type === 'mostpopular') {
            setLoading(true);
            let arr = type.split("");
            arr[0] = arr[0].toUpperCase();
            arr.splice(4, 0, " ");
            setString(arr.join(""));
            console.log(string);
            await mostPopular(newController.signal);
            setLoading(false);
        } else {
            setLoading(true);
            let arr = type.split("");
            arr[0] = arr[0].toUpperCase();
            setString(arr.join(""));
            await getCategory(newController.signal);
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if (controller) {
            controller.abort();
            setLoading(false);
            setController(null);
        }
    };

    useEffect(() => {
        getAllPodcasts();
    }, [type]);

    return (
        <DisplayMain>
            <Container>
                <Topic>{string} <Button variant="contained" color="secondary" onClick={handleCancel}>Cancel</Button></Topic>
                {loading ?
                    <Loader>
                        <CircularProgress />
                    </Loader>
                    :
                    <Podcasts>
                        {podcasts.length === 0 && <DisplayNo>No Podcasts</DisplayNo>}
                        {podcasts.map((podcast) => (
                            <PodcastCard key={podcast.id} podcast={podcast} />
                        ))}
                    </Podcasts>
                }
            </Container>
        </DisplayMain>
    );
};

export default DisplayPodcasts;
