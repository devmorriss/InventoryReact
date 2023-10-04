import { makeAutoObservable, runInAction } from 'mobx';
import { ItemModel } from '../models/itemModel';
import agent from '../api/agent';
import { v4 as uuid } from 'uuid';

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
    try {
      const items = await agent.Items.list();

      items.forEach((item) => {
        item.dateCreated = item.dateCreated.split('T')[0];
        this.itemRegistry.set(item.id, item);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectItem = (id: string) => {
    this.selectedItem = this.itemRegistry.get(id);
  };

  cancelSelectedItem = () => {
    this.selectedItem = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectItem(id) : this.cancelSelectedItem();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createItem = async (item: ItemModel) => {
    this.loading = true;
    item.id = uuid();
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
        if (this.selectedItem?.id === id) this.cancelSelectedItem();
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
