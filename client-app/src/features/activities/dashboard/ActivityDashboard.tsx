import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ItemList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponents from '../../../app/layouts/LoadingComponents';
import ActivityFilters from './ActivityFilters';

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore();
  const { loadActivities, activityRegistry } = activityStore;

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponents content='Loading app' />;

  return (
    <Grid>
      <Grid.Column width='10'>
        <ItemList />
      </Grid.Column>
      <Grid.Column width='6'>
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
});