'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface AvatarProps {
  /**
   * The source URL for the avatar image
   */
  src?: string;
  /**
   * The alt text for the avatar image
   */
  alt?: string;
  /**
   * The size of the avatar
   * @default "md"
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * Additional CSS classes to apply
   */
  className?: string;
  /**
   * Initials to display if no image is provided
   */
  initials?: string;
  /**
   * Status indicator for the avatar
   */
  status?: "online" | "offline" | "busy" | "away";
}

interface AvatarGroupProps {
  /**
   * The avatars to display
   */
  children: React.ReactNode;
  /**
   * The maximum number of avatars to show
   * @default 5
   */
  max?: number;
  /**
   * Additional CSS classes to apply
   */
  className?: string;
}

/**
 * An avatar component to display user profile pictures or initials
 * 
 * @example
 * ```tsx
 * <Avatar src="/user.jpg" alt="User Name" />
 * 
 * <Avatar initials="JD" />
 * ```
 */
export function Avatar({ 
  src, 
  alt = "User avatar", 
  size = "md", 
  className,
  initials,
  status 
}: AvatarProps) {
  // Define size classes
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
  };

  // Define status colors
  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-500",
    busy: "bg-red-500",
    away: "bg-yellow-500",
  };

  return (
    <div className="relative inline-block">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        className={cn(
          "rounded-full bg-gray-200 flex items-center justify-center font-medium text-gray-700 overflow-hidden",
          sizeClasses[size],
          className
        )}
      >
        {src ? (
          <img 
            src={src} 
            alt={alt} 
            className="h-full w-full object-cover"
          />
        ) : initials ? (
          <span>{initials}</span>
        ) : (
          <span className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
        )}
      </motion.div>
      
      {status && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={cn(
            "absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white",
            statusColors[status]
          )}
        />
      )}
    </div>
  );
}

/**
 * A group of avatars with overlap and count display
 * 
 * @example
 * ```tsx
 * <AvatarGroup max={3}>
 *   <Avatar src="/user1.jpg" />
 *   <Avatar src="/user2.jpg" />
 *   <Avatar src="/user3.jpg" />
 *   <Avatar src="/user4.jpg" />
 * </AvatarGroup>
 * ```
 */
export function AvatarGroup({ children, max = 5, className }: AvatarGroupProps) {
  const avatars = React.Children.toArray(children);
  const displayedAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div className={cn("flex", className)}>
      {displayedAvatars.map((avatar, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className={index > 0 ? "-ml-2" : ""}
          style={{ zIndex: displayedAvatars.length - index }}
        >
          {avatar}
        </motion.div>
      ))}
      
      {remainingCount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="-ml-2 flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-600 text-sm font-medium border-2 border-white"
        >
          +{remainingCount}
        </motion.div>
      )}
    </div>
  );
}