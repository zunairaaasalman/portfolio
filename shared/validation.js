// Simple validation functions for project data

const isValidUrl = (url) => {
  if (!url || url === "") return true; // Empty URLs are allowed
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const isValidStatus = (status) => {
  const validStatuses = ["planning", "in-progress", "completed", "on-hold"];
  return validStatuses.includes(status);
};

export const validateProject = (data, isPartial = false) => {
  const errors = [];
  const result = { ...data };

  // Required fields validation (only for create, not update)
  if (!isPartial) {
    if (!data.title || data.title.trim() === "") {
      errors.push("Title is required");
    }
    if (!data.description || data.description.trim() === "") {
      errors.push("Description is required");
    }
    if (!data.technologies || data.technologies.trim() === "") {
      errors.push("Technologies are required");
    }
  }

  // URL validation
  if (data.projectUrl !== undefined && !isValidUrl(data.projectUrl)) {
    errors.push("Project URL must be a valid URL");
  }
  if (data.githubUrl !== undefined && !isValidUrl(data.githubUrl)) {
    errors.push("GitHub URL must be a valid URL");
  }
  if (data.imageUrl !== undefined && !isValidUrl(data.imageUrl)) {
    errors.push("Image URL must be a valid URL");
  }

  // Status validation
  if (data.status !== undefined && !isValidStatus(data.status)) {
    errors.push("Status must be one of: planning, in-progress, completed, on-hold");
  }

  // Set default status if not provided
  if (!data.status) {
    result.status = "planning";
  }

  // Convert empty strings to empty strings (not undefined)
  if (data.projectUrl === undefined) result.projectUrl = "";
  if (data.githubUrl === undefined) result.githubUrl = "";
  if (data.imageUrl === undefined) result.imageUrl = "";

  return {
    success: errors.length === 0,
    data: result,
    errors
  };
};