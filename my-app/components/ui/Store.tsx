"use client";
import { useState, useEffect } from "react";
import React from "react";

import FilterProduct from "./FilterProduct";
import axios from "axios";
import Product from "@/components/ui/Product";

export type categoryAndSubId = {
  category: string;
  subCategory: string;
};

export default function Store({
  categoryIdAndSubId,
}: {
  categoryIdAndSubId: categoryAndSubId;
}) 
{
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full">
        <FilterProduct categoryIdAndSubId={categoryIdAndSubId}/>
      </div>
    </div>
  );
}
