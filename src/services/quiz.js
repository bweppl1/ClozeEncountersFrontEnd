import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8000";

export const get_random_cloze = async (maxId) => {
  try {
    const response = await axios.get(`${API_BASE}/random_cloze/`, {
      params: {
        max_id: maxId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching random cloze:", error);
  }
};
