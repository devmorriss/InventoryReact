import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import LoadingComponents from '../../../app/layouts/LoadingComponents';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import ItemDetailedHeader from './ActivityDetailedHeader';
import ItemDetailedInfo from './ActivityDetailedInfo';
import ItemDetailedChat from './ActivityDetailedChat';
import ItemDetailedSidebar from './ActivityDetailedSidebar';

export default observer(function ActivityDetails() {
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    loadActivity,
    loadingInitial,
    clearSelectedActivity,
  } = activityStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) loadActivity(id);
    return () => clearSelectedActivity();
  }, [id, loadActivity, clearSelectedActivity]);

  if (loadingInitial || !activity) return <LoadingComponents />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ItemDetailedHeader activity={activity} />
        <ItemDetailedInfo activity={activity} />
        <ItemDetailedChat activityId={activity.id} />
      </Grid.Column>
      <Grid.Column width={6}>
        <ItemDetailedSidebar activity={activity} />
      </Grid.Column>
    </Grid>
  );
});
