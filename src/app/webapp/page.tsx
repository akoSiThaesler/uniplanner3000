"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext"; // Adjust the import path as needed

// MUI Icons
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SearchIcon from "@mui/icons-material/Search";
import TagIcon from "@mui/icons-material/Tag";

export default function InteractiveBlogPage() {
  const { user } = useAuth();

  // Updated sample posts with actual image URLs and coherent content.
  const initialPosts = [
    {
      id: 1,
      title: "Introducing Our Latest Feature",
      excerpt: "Revolutionize your workflow with our new productivity booster.",
      content:
        "We're excited to announce our latest feature that revolutionizes productivity. Our new tool integrates seamlessly into your workflow, automates repetitive tasks, and provides real-time analytics to help you make data-driven decisions.",
      date: "2025-03-01",
      thumbnail:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      author: "teacher@example.com",
      tags: ["feature", "innovation", "productivity"],
    },
    {
      id: 2,
      title: "Minimalism in Modern UI",
      excerpt:
        "Discover how minimalism enhances user experience in digital design.",
      content:
        "Modern UI design has embraced minimalism to declutter digital interfaces and focus on what truly matters. This article explores the principles behind minimalism, the benefits of clean design, and how it leads to better user engagement.",
      date: "2025-02-20",
      thumbnail:
        "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      author: "teacher@example.com",
      tags: ["design", "minimalism", "UI"],
    },
    {
      id: 3,
      title: "Tech Trends in 2025",
      excerpt:
        "Stay ahead with insights on AI, blockchain, and quantum computing.",
      content:
        "The technology landscape is evolving rapidly. In this article, we dive into the most promising trends of 2025, including advancements in artificial intelligence, the growing influence of blockchain, and the potential of quantum computing to reshape industries.",
      date: "2025-02-10",
      thumbnail:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      author: "admin@example.com",
      tags: ["tech", "trends", "innovation"],
    },
    {
      id: 4,
      title: "Understanding React Hooks",
      excerpt:
        "Learn how React Hooks simplify state management and lifecycle methods.",
      content:
        "React Hooks have transformed how developers write functional components. This article provides a deep dive into useState, useEffect, and custom hooks, offering practical examples that demonstrate how these powerful tools can simplify complex state management tasks.",
      date: "2025-03-05",
      thumbnail:
        "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      author: "owner@example.com",
      tags: ["react", "hooks", "javascript"],
    },
    {
      id: 5,
      title: "Mastering CSS Grid Layout",
      excerpt: "Unlock the full potential of CSS Grid for responsive design.",
      content:
        "CSS Grid Layout has revolutionized web design by enabling the creation of complex, responsive layouts with ease. In this comprehensive guide, we explore techniques, best practices, and creative approaches to using CSS Grid to build modern, fluid web interfaces.",
      date: "2025-03-02",
      thumbnail:
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      author: "admin@example.com",
      tags: ["css", "grid", "web design"],
    },
    {
      id: 6,
      title: "Building Scalable APIs with Node.js",
      excerpt: "Best practices for creating robust and efficient backend APIs.",
      content:
        "Node.js offers a powerful platform for building scalable APIs. This article covers essential techniques including API design, error handling, and performance optimization. Learn how to create robust backend services that can handle high traffic and complex data interactions.",
      date: "2025-03-03",
      thumbnail:
        "https://images.unsplash.com/photo-1581093588401-51ac1a5d3d43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      author: "admin@example.com",
      tags: ["node", "api", "backend"],
    },
    {
      id: 7,
      title: "Effective Debugging Techniques",
      excerpt:
        "Master the art of debugging to speed up your development process.",
      content:
        "Debugging is an indispensable skill for any developer. In this article, we share effective strategies for identifying and resolving code issues—from leveraging advanced logging techniques to utilizing modern debugging tools and best practices for efficient troubleshooting.",
      date: "2025-03-04",
      thumbnail:
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      author: "student@example.com",
      tags: ["debugging", "tips", "development"],
    },
  ];

  const [posts, setPosts] = useState(initialPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  // For new posts, tags are stored as a comma-separated string.
  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    thumbnail: "",
    tags: "",
  });
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editingData, setEditingData] = useState({
    title: "",
    excerpt: "",
    content: "",
    thumbnail: "",
    tags: "",
  });
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Create a new post.
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newPost.title.trim() ||
      !newPost.excerpt.trim() ||
      !newPost.content.trim()
    )
      return;
    const newId = posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
    const tagsArray =
      newPost.tags.trim() !== ""
        ? newPost.tags
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t)
        : [];
    const postToAdd = {
      id: newId,
      title: newPost.title,
      excerpt: newPost.excerpt,
      content: newPost.content,
      thumbnail: newPost.thumbnail,
      date: new Date().toISOString().split("T")[0],
      author: user ? user.email : "unknown",
      tags: tagsArray,
    };
    setPosts([postToAdd, ...posts]);
    setNewPost({
      title: "",
      excerpt: "",
      content: "",
      thumbnail: "",
      tags: "",
    });
    setShowNewPostForm(false);
  };

  // Delete a post.
  const handleDelete = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  // Start editing a post.
  const startEditing = (post: {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    thumbnail: string;
    tags: string[];
  }) => {
    setEditingPostId(post.id);
    setEditingData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      thumbnail: post.thumbnail,
      tags: post.tags.join(", "),
    });
  };

  // Save the edited post.
  const handleEditSave = (id: number) => {
    const tagsArray =
      editingData.tags.trim() !== ""
        ? editingData.tags
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t)
        : [];
    setPosts(
      posts.map((post) =>
        post.id === id
          ? {
              ...post,
              title: editingData.title,
              excerpt: editingData.excerpt,
              content: editingData.content,
              thumbnail: editingData.thumbnail,
              tags: tagsArray,
            }
          : post
      )
    );
    setEditingPostId(null);
    setEditingData({
      title: "",
      excerpt: "",
      content: "",
      thumbnail: "",
      tags: "",
    });
  };

  // Cancel editing.
  const handleEditCancel = () => {
    setEditingPostId(null);
    setEditingData({
      title: "",
      excerpt: "",
      content: "",
      thumbnail: "",
      tags: "",
    });
  };

  // Toggle post expansion to show full content.
  const toggleExpand = (id: number) => {
    setExpandedPostId(expandedPostId === id ? null : id);
  };

  // Compute unique tags from posts.
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  // Filter posts by title and selected tag.
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="py-10 px-4 sm:px-8 text-[var(--foreground)]">
      {/* Create New Post Button */}
      <div className="max-w-4xl mx-auto mb-6">
        <button
          onClick={() => setShowNewPostForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--highlight-color)] text-white rounded hover:bg-[var(--highlight-hover)] transition-colors"
        >
          <AddIcon />
          Create New Post
        </button>
      </div>

      {/* New Post Modal */}
      <AnimatePresence>
        {showNewPostForm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[var(--background)] p-6 rounded-lg shadow-lg max-w-xl w-full mx-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h2 className="text-2xl font-bold mb-4">New Post</h2>
              <form onSubmit={handleCreate}>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                  className="w-full p-3 mb-4 border border-[var(--background-2)] rounded focus:outline-none focus:border-[var(--highlight-color)]"
                />
                <input
                  type="text"
                  name="excerpt"
                  placeholder="Excerpt"
                  value={newPost.excerpt}
                  onChange={(e) =>
                    setNewPost({ ...newPost, excerpt: e.target.value })
                  }
                  className="w-full p-3 mb-4 border border-[var(--background-2)] rounded focus:outline-none focus:border-[var(--highlight-color)]"
                />
                <textarea
                  name="content"
                  placeholder="Full Content"
                  value={newPost.content}
                  onChange={(e) =>
                    setNewPost({ ...newPost, content: e.target.value })
                  }
                  className="w-full p-3 mb-4 border border-[var(--background-2)] rounded focus:outline-none focus:border-[var(--highlight-color)]"
                  rows={4}
                ></textarea>
                <input
                  type="text"
                  name="thumbnail"
                  placeholder="Thumbnail URL"
                  value={newPost.thumbnail}
                  onChange={(e) =>
                    setNewPost({ ...newPost, thumbnail: e.target.value })
                  }
                  className="w-full p-3 mb-4 border border-[var(--background-2)] rounded focus:outline-none focus:border-[var(--highlight-color)]"
                />
                <input
                  type="text"
                  name="tags"
                  placeholder="Tags (comma separated)"
                  value={newPost.tags}
                  onChange={(e) =>
                    setNewPost({ ...newPost, tags: e.target.value })
                  }
                  className="w-full p-3 mb-4 border border-[var(--background-2)] rounded focus:outline-none focus:border-[var(--highlight-color)]"
                />
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowNewPostForm(false)}
                    className="flex items-center gap-1 px-4 py-2 border border-[var(--highlight-color)] text-[var(--highlight-color)] rounded hover:bg-[var(--highlight-color)] hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1 px-4 py-2 bg-[var(--highlight-color)] text-white rounded hover:bg-[var(--highlight-hover)] transition-colors"
                  >
                    <AddIcon />
                    Publish
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="relative mb-4">
          <SearchIcon className="absolute left-3 top-3 text-[var(--foreground)] opacity-70" />
          <input
            type="text"
            placeholder="Search posts by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 p-3 border border-[var(--background-2)] rounded focus:outline-none focus:border-[var(--highlight-color)]"
          />
        </div>
        {/* Desktop Filters */}
        <div className="hidden sm:flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag("")}
            className={`flex items-center gap-1 px-3 py-1 rounded ${
              selectedTag === ""
                ? "bg-[var(--highlight-color)] text-white"
                : "bg-[var(--background)] text-[var(--foreground)] border border-[var(--background-2)] hover:bg-[var(--highlight-color)] hover:text-white transition-colors"
            }`}
          >
            <TagIcon fontSize="small" />
            All Tags
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`flex items-center gap-1 px-3 py-1 rounded ${
                selectedTag === tag
                  ? "bg-[var(--highlight-color)] text-white"
                  : "bg-[var(--background)] text-[var(--foreground)] border border-[var(--background-2)] hover:bg-[var(--highlight-color)] hover:text-white transition-colors"
              }`}
            >
              <TagIcon fontSize="small" />
              {tag}
            </button>
          ))}
        </div>
        {/* Mobile More Filters Toggle */}
        <div className="sm:hidden">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-1 px-3 py-1 rounded bg-[var(--highlight-color)] text-white transition-colors"
          >
            <TagIcon fontSize="small" />
            More Filters
          </button>
          <AnimatePresence>
            {showMobileFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="flex flex-wrap gap-2 mt-2"
              >
                <button
                  onClick={() => {
                    setSelectedTag("");
                    setShowMobileFilters(false);
                  }}
                  className={`flex items-center gap-1 px-3 py-1 rounded ${
                    selectedTag === ""
                      ? "bg-[var(--highlight-color)] text-white"
                      : "bg-[var(--background)] text-[var(--foreground)] border border-[var(--background-2)] hover:bg-[var(--highlight-color)] hover:text-white transition-colors"
                  }`}
                >
                  <TagIcon fontSize="small" />
                  All Tags
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSelectedTag(tag);
                      setShowMobileFilters(false);
                    }}
                    className={`flex items-center gap-1 px-3 py-1 rounded ${
                      selectedTag === tag
                        ? "bg-[var(--highlight-color)] text-white"
                        : "bg-[var(--background)] text-[var(--foreground)] border border-[var(--background-2)] hover:bg-[var(--highlight-color)] hover:text-white transition-colors"
                    }`}
                  >
                    <TagIcon fontSize="small" />
                    {tag}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Posts List */}
      <AnimatePresence>
        <div className="max-w-4xl mx-auto grid gap-8">
          {filteredPosts.map((post) => {
            // Allow modifications only if the user is the post's author,
            // an admin, or the designated owner.
            /*     const canModify =
              user &&
              (user.email === post.author ||
                user.role === "admin" ||
                user.email === "owner@example.com"); */

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                layout
                className="p-6 border border-[var(--background-2)] bg-[var(--background)] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {editingPostId === post.id ? (
                  <div>
                    <input
                      type="text"
                      name="title"
                      value={editingData.title}
                      onChange={(e) =>
                        setEditingData({
                          ...editingData,
                          title: e.target.value,
                        })
                      }
                      className="w-full p-2 mb-2 border border-[var(--background-2)] rounded focus:outline-none focus:border-[var(--highlight-color)]"
                    />
                    <input
                      type="text"
                      name="excerpt"
                      value={editingData.excerpt}
                      onChange={(e) =>
                        setEditingData({
                          ...editingData,
                          excerpt: e.target.value,
                        })
                      }
                      className="w-full p-2 mb-2 border border-[var(--background-2)] rounded focus:outline-none focus:border-[var(--highlight-color)]"
                    />
                    <textarea
                      name="content"
                      value={editingData.content}
                      onChange={(e) =>
                        setEditingData({
                          ...editingData,
                          content: e.target.value,
                        })
                      }
                      className="w-full p-2 mb-2 border border-[var(--background-2)] rounded focus:outline-none focus:border-[var(--highlight-color)]"
                      rows={4}
                    ></textarea>
                    <input
                      type="text"
                      name="thumbnail"
                      value={editingData.thumbnail}
                      onChange={(e) =>
                        setEditingData({
                          ...editingData,
                          thumbnail: e.target.value,
                        })
                      }
                      className="w-full p-2 mb-2 border border-[var(--background-2)] rounded focus:outline-none focus:border-[var(--highlight-color)]"
                      placeholder="Thumbnail URL"
                    />
                    <input
                      type="text"
                      name="tags"
                      value={editingData.tags}
                      onChange={(e) =>
                        setEditingData({
                          ...editingData,
                          tags: e.target.value,
                        })
                      }
                      className="w-full p-2 mb-2 border border-[var(--background-2)] rounded focus:outline-none focus:border-[var(--highlight-color)]"
                      placeholder="Tags (comma separated)"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditSave(post.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-[var(--highlight-color)] text-white rounded hover:bg-[var(--highlight-hover)] transition-colors"
                      >
                        <EditIcon className="mr-1" />
                        Save
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="flex items-center gap-1 px-3 py-1 border border-[var(--highlight-color)] text-[var(--highlight-color)] rounded hover:bg-[var(--highlight-color)] hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {post.thumbnail && (
                      <img
                        src={post.thumbnail}
                        alt={`Thumbnail for ${post.title}`}
                        className="w-full h-48 object-cover rounded mb-4"
                      />
                    )}
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-sm opacity-80 mb-2">
                      {new Date(post.date).toLocaleDateString()} &bull;{" "}
                      <span className="italic">By {post.author}</span>
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 px-2 py-1 text-xs bg-[var(--background-2)] rounded"
                        >
                          <TagIcon fontSize="small" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="mb-4">
                      {expandedPostId === post.id ? post.content : post.excerpt}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleExpand(post.id)}
                        className="flex items-center gap-1 px-3 py-1 border border-[var(--highlight-color)] text-[var(--highlight-color)] rounded hover:bg-[var(--highlight-color)] hover:text-white transition-colors"
                      >
                        {expandedPostId === post.id ? (
                          <>
                            <ExpandLessIcon className="mr-1" />
                            Show Less
                          </>
                        ) : (
                          <>
                            <ExpandMoreIcon className="mr-1" />
                            Read More
                          </>
                        )}
                      </button>
                      {user &&
                        (user.email === post.author ||
                          user.role === "admin" ||
                          user.email === "owner@example.com") && (
                          <>
                            <button
                              onClick={() => startEditing(post)}
                              className="flex items-center gap-1 px-3 py-1 bg-[var(--highlight-color)] text-white rounded hover:bg-[var(--highlight-hover)] transition-colors"
                            >
                              <EditIcon className="mr-1" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="flex items-center gap-1 px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors"
                            >
                              <DeleteIcon className="mr-1" />
                              Delete
                            </button>
                          </>
                        )}
                    </div>
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </AnimatePresence>
    </div>
  );
}
