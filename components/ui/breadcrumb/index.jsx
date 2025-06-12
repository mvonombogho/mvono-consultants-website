'use client';

import * as React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

const Breadcrumb = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="breadcrumb"
        className={cn(
          'flex flex-wrap items-center text-sm text-muted-foreground',
          className
        )}
        {...props}
      />
    );
  }
);
Breadcrumb.displayName = 'Breadcrumb';

const BreadcrumbItem = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <React.Fragment>
        <li
          ref={ref}
          className={cn('inline-flex items-center', className)}
          {...props}
        />
        {props.children && <BreadcrumbSeparator />}
      </React.Fragment>
    );
  }
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

const BreadcrumbLink = React.forwardRef(
  ({ asChild, className, href, ...props }, ref) => {
    const Comp = href ? Link : 'span';
    return (
      <Comp
        ref={ref}
        href={href}
        className={cn(
          href ? 'hover:text-foreground' : 'text-foreground font-medium',
          className
        )}
        {...props}
      />
    );
  }
);
BreadcrumbLink.displayName = 'BreadcrumbLink';

const BreadcrumbSeparator = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <ChevronRight
        ref={ref}
        className={cn('mx-2 h-4 w-4', className)}
        {...props}
      />
    );
  }
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

export { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator };
