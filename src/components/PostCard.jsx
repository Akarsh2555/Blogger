import React from "react";
import service from "../appwrite/config";
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="block transform transition-all duration-300 hover:scale-105">
      <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-white border border-yellow-100 hover:shadow-2xl transition-shadow">
        <div className="relative">
          <img 
            src={service.getFileView(featuredImage)} 
            alt={title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-yellow-500 opacity-20 hover:opacity-0 transition-opacity"></div>
        </div>
        
        <div className="p-4 space-y-2">
          <h2 className="text-xl font-bold text-yellow-800 line-clamp-2">
            {title}
          </h2>
          <div className="flex items-center text-yellow-500 hover:text-yellow-800 transition-colors">
            <BookOpen className="mr-2" size={20} />
            <span className="text-sm">Read More</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;