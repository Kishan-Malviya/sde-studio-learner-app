SDE Studio Learner App — Source Package
=======================================

Contents
--------
- src/ contains the complete source tree supplied for review.
- Source files have been preserved as uploaded; application code was not rewritten.

Validation performed
--------------------
- Archive contains 48 files under src/.
- Relative imports in the source tree were checked; no unresolved local import paths were found.
- This source-only package does not include package.json, angular.json, tsconfig files, node_modules, or other project-root configuration. Run `ng build` from the original project root to validate the app with its installed dependencies.

Main areas
----------
- app/ — Angular application shell, routes, features, and layout components
- app/features/dashboard/ — dashboard
- app/features/courses/course-catalog/ — course catalog
- app/features/courses/course-details/ — six course curricula and details UI
- app/features/courses/lesson-workspace/ — lesson workspace and navigation
- app/core/services/learning-progress.ts — local-storage-backed learning progress
- app/layout/ — learner layout, header, sidebar, and placeholder page
- styles.css, material-theme.scss, index.html, main.ts, server.ts — global styling and application entry/server files
