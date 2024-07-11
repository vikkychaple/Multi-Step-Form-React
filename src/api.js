export const simulateApiCall = (formData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        
        const success = Math.random() > 0.2; 
        if (success) {
          resolve({ status: 'success', data: formData });
        } else {
          reject({ status: 'error', message: 'Something went wrong. Please try again.' });
        }
      }, 2000); 
    });
  };
  