import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8000";

export const get_words = async () => {
  try {
    const response = await axios.get(`${API_BASE}/words/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching random cloze:", error);
  }
};
