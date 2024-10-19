import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    brand: [],
    model: [],
    generation: [],
    available: 0,
    selectedBrand: 0,
    selectedModel: 0,
    selectedGeneration: 0,
    isChecked: false,
    totalPages: 0,
    currentPage: 1,
  },
  reducers: {
    setBrand(state, action) {
      state.brand = action.payload;
    },
    setModel(state, action) {
      state.model = action.payload;
    },
    setGeneration(state, action) {
      state.generation = action.payload;
    },
    setAvailable(state, action) {
      state.available = action.payload;
    },
    setSelectedBrand(state, action) {
      state.selectedBrand = action.payload;
    },
    setSelectedModel(state, action) {
      state.selectedModel = action.payload;
    },
    setSelectedGeneration(state, action) {
      state.selectedGeneration = action.payload;
    },
    setIsChecked(state, action) {
      state.isChecked = action.payload;
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    }
  }
})

export function fetchBrands() {
  return function(dispatch) {
    axios
      .get("https://frost.runtime.kz/api/brands")
      .then(function(response) {
        const brands = response.data.map(function(brand) {
          return { name: brand.name, id: brand.id }
        })
        dispatch(setBrand(brands));
      })
  }
}

export function fetchModels(brandId) {
  return function(dispatch) {
    axios
      .get(`https://frost.runtime.kz/api/models?brandId=${brandId}`)
      .then(function(response) {
        const models = response.data.map(function(model) {
          return { name: model.name, id: model.id }
        })
        dispatch(setModel(models));
      });
  }
}

export function fetchGenerations(modelId) {
  return function(dispatch) {
    axios
      .get(`https://frost.runtime.kz/api/generations?modelId=${modelId}`)
      .then(function(response) {
        const generations = response.data.map(function(generation) {
          return { name: generation.name, id: generation.id }
        })
        dispatch(setGeneration(generations));
      });

  }
}

export const {
  setBrand,
  setModel,
  setGeneration,
  setAvailable,
  setSelectedBrand,
  setSelectedModel,
  setSelectedGeneration,
  setIsChecked,
  setTotalPages,
  setCurrentPage
} = filterSlice.actions;

export const filterReducer = filterSlice.reducer;