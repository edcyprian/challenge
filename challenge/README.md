
## File Structure

I didn't get great code coverage nor accessibility because of time restriction

I had simple components for each core functionality. if there was more complexity would have considered using domain module approach. 

- **`components/`**: Contains reusable UI components.
  - **`user-table/`**: Component for displaying user data in a table format.
  - **`visual-components/`**: Contains various visual components for data representation:
    - **`bar-chart/`**: Bar chart component.
    - **`pie-chart/`**: Pie chart component.
    - **`line-chart/`**: Line chart component.

- **`models/`**: Contains TypeScript models used throughout the application.
  - **`user.model.ts`**: Defines the user model.

- **`services/`**: Contains services that handle business logic and data management.
  - **`user.service.ts`**: Service for managing user-related operations.

- **`store/`**: Contains Redux (or NgRx) related files for state management.
  - **`actions/`**: Defines actions used in the store.
    - **`user.actions.ts`**: Actions related to user operations.
  - **`effects/`**: Contains effects that handle side-effects.
    - **`user.effects.ts`**: Effects related to user operations.
  - **`reducers/`**: Contains reducers for updating the state.
    - **`user.reducer.ts`**: Reducer for user-related state changes.
  - **`selectors/`**: Defines selectors for querying the state.
    - **`user.selectors.ts`**: Selectors related to user operations.

- **`app.component.*`**: Main application component files.
- **`app.module.ts`**: The root module of the application.
- **`app-routing.module.ts`**: Module for configuring application routes.
- **`index.html`**: Main HTML file for the application.

## Setup

1. **Install Dependencies**:
   ```bash
   npm install --legacy-peer-deps
