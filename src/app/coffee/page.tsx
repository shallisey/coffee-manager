"use client";
import { fetchPost } from "@/utils/fetchHelper";
import React, { useEffect, useState } from "react";

const Coffee = () => {
  const getData = async () => {
    const response = await fetchPost("/api/hello-world");
  };
  useEffect(() => {
    getData();
  }, []);

  return <div>Coffee</div>;
};

export default Coffee;
