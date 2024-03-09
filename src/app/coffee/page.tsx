"use client";
import { fetchPost } from "@/utils/fetchHelper";
import React, { useEffect, useState } from "react";

const Coffee = () => {
  const getData = async () => {
    const response = await fetchPost("/api/coffee");
    const response2 = await fetchPost("/api/coffee/2");
  };
  useEffect(() => {
    getData();
  }, []);

  return <div>Coffee</div>;
};

export default Coffee;
