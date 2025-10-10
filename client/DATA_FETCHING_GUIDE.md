# Real-Life Data Fetching Guide for React Hospital App

This guide teaches you how to properly fetch and manage appointment data in a real-world React application.

## 📁 File Structure

```
src/
├── services/           # API service layer
│   └── appointmentService.tsx
├── hooks/             # Custom hooks for data management
│   └── useAppointments.tsx
├── components/        # Reusable UI components
└── pages/            # Page components that use the hooks
    └── appointment/
        └── AppointmentNew.tsx
```

## 🔧 1. Service Layer (appointmentService.tsx)

The service layer handles all API communication:

### Key Features:
- **Type Safety**: Uses TypeScript for all requests/responses
- **Error Handling**: Proper try/catch blocks
- **Query Parameters**: Dynamic filtering and pagination
- **CRUD Operations**: Create, Read, Update, Delete
- **Status Management**: Update appointment statuses

### Example Usage:
```typescript
// Get filtered appointments
const response = await appointmentService.getAppointments({
  page: 1,
  limit: 10,
  status: 'PENDING',
  search: 'John Doe'
});

// Update appointment status
await appointmentService.updateAppointmentStatus(123, 'CONFIRMED');
```

## 🎣 2. Custom Hooks (useAppointments.tsx)

Custom hooks manage state and provide a clean API:

### Key Features:
- **State Management**: Loading, error, data states
- **Automatic Filtering**: Debounced filter updates
- **Pagination**: Page navigation and size changes
- **Optimistic Updates**: Immediate UI updates
- **Error Handling**: Toast notifications for errors

### Hook Returns:
```typescript
const {
  appointments,      // Current appointment data
  loading,          // Loading state
  error,           // Error message
  pagination,      // Page info (current, total, etc.)
  updateFilters,   // Function to update filters
  changePage,      // Navigate to different page
  changePageSize,  // Change items per page
  updateAppointmentStatus, // Update status
  deleteAppointment,      // Delete appointment
  refresh         // Reload data
} = useAppointments();
```

## 📋 3. Component Implementation (AppointmentNew.tsx)

The component uses the hook and focuses on UI:

### Key Features:
- **Real-time Filtering**: Debounced search (500ms)
- **Loading States**: Spinners and disabled buttons
- **Empty States**: Helpful messages when no data
- **Error Handling**: Error message display
- **Responsive Design**: Desktop table, mobile cards
- **Status Management**: Update appointment statuses
- **Modal Integration**: Detail view popup

## 🔄 4. Data Flow

```
User Action → Component → Hook → Service → API
     ↓                                       ↓
UI Update ← Component ← Hook ← Response ← Server
```

### Example Flow:
1. User types in search box
2. `setSearchQuery()` updates local state
3. `useEffect` triggers after 500ms debounce
4. `updateFilters()` calls the hook
5. Hook calls `appointmentService.getAppointments()`
6. Service makes HTTP request to API
7. Response updates hook state
8. Component re-renders with new data

## 🏆 Best Practices Demonstrated

### 1. **Separation of Concerns**
- Services handle API logic
- Hooks manage state
- Components handle UI

### 2. **Type Safety**
```typescript
// Proper typing for all data structures
type AppointmentFilters = {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
};
```

### 3. **Error Handling**
```typescript
try {
  const response = await api.get('/appointments');
  return response.data;
} catch (error) {
  console.error('Error fetching appointments:', error);
  throw error;
}
```

### 4. **Loading States**
```typescript
// Always show loading feedback
{loading && (
  <div className="flex justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <span className="ml-2">Đang tải dữ liệu...</span>
  </div>
)}
```

### 5. **Optimistic Updates**
```typescript
// Update UI immediately, then sync with server
setAppointments(prev => 
  prev.map(appointment => 
    appointment.id === id ? { ...appointment, status } : appointment
  )
);
```

### 6. **Debounced Filtering**
```typescript
// Prevent too many API calls
useEffect(() => {
  const timeoutId = setTimeout(() => {
    updateFilters({ search: searchQuery });
  }, 500);
  return () => clearTimeout(timeoutId);
}, [searchQuery]);
```

### 7. **Responsive Design**
```typescript
// Different layouts for different screen sizes
<div className="hidden lg:block">
  {/* Desktop table */}
</div>
<div className="lg:hidden">
  {/* Mobile cards */}
</div>
```

## 🚀 Usage Example

```typescript
const AppointmentPage = () => {
  // 1. Use the custom hook
  const {
    appointments,
    loading,
    error,
    updateFilters,
    updateAppointmentStatus
  } = useAppointments({ limit: 10 });

  // 2. Handle user interactions
  const handleSearch = (query: string) => {
    updateFilters({ search: query, page: 1 });
  };

  const handleStatusChange = async (id: number, status: string) => {
    await updateAppointmentStatus(id, status);
  };

  // 3. Render UI with proper states
  return (
    <div>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {appointments.map(appointment => (
        <AppointmentCard 
          key={appointment.id}
          appointment={appointment}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
};
```

## 🔐 Authentication Integration

The service automatically includes authentication:

```typescript
// In api.tsx interceptor
api.interceptors.request.use((config) => {
  const authSession = sessionStorage.getItem("CURRENT_USER");
  if (authSession) {
    const auth = JSON.parse(authSession);
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  }
  return config;
});
```

## 📊 Performance Optimizations

1. **Pagination**: Only load needed data
2. **Debouncing**: Reduce API calls during search
3. **Memoization**: Prevent unnecessary re-renders
4. **Optimistic Updates**: Immediate UI feedback
5. **Error Recovery**: Retry mechanisms
6. **Caching**: Store frequently accessed data

## 🧪 Testing Considerations

```typescript
// Mock the service for testing
jest.mock('../services/appointmentService', () => ({
  appointmentService: {
    getAppointments: jest.fn().mockResolvedValue({
      statusCode: 200,
      data: { appointments: [], total: 0 }
    })
  }
}));
```

This approach provides a robust, scalable, and maintainable solution for data fetching in real-world React applications.