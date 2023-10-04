import { makeAutoObservable, runInAction } from 'mobx';
import { ItemModel } from '../models/itemModel';
import agent from '../api/agent';

export default class ItemStore {
  itemRegistry = new Map<string, ItemModel>();
  selectedItem: ItemModel | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get itemsByDate() {
    return Array.from(this.itemRegistry.values()).sort(
      (a, b) => Date.parse(a.dateCreated) - Date.parse(b.dateCreated)
    );
  }

  loadItems = async () => {
    this.loadingInitial = true;
    try {
      const items = await agent.Items.list();

      items.forEach((item) => {
        this.setItem(item);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadItem = async (id: string) => {
    let item = this.getItem(id);
    if (item) {
      this.selectedItem = item;
      return item;
    } else {
      this.loadingInitial = true;
      try {
        item = await agent.Items.details(id);
        this.setItem(item);
        runInAction(() => {
          this.selectedItem = item;
        });
        this.setLoadingInitial(false);
        return item;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setItem = (item: ItemModel) => {
    item.dateCreated = item.dateCreated.split('T')[0];
    this.itemRegistry.set(item.id, item);
  };

  private getItem = (id: string) => {
    return this.itemRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createItem = async (item: ItemModel) => {
    this.loading = true;
    try {
      await agent.Items.create(item);
      runInAction(() => {
        this.itemRegistry.set(item.id, item);
        this.selectedItem = item;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateItem = async (item: ItemModel) => {
    this.loading = true;
    try {
      await agent.Items.update(item);
      runInAction(() => {
        this.itemRegistry.set(item.id, item);
        this.selectedItem = item;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteItem = async (id: string) => {
    this.loading = true;
    try {
      await agent.Items.delete(id);
      runInAction(() => {
        this.itemRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
