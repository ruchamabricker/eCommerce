import Store, { categoryAndSubId } from '@/components/ui/Store';
import React from 'react';


export default function Page({ params }: { params: { id: string; subCategories: string } }) {
    const categoryIdAndSubId : categoryAndSubId = {
        category: params.id,
        subCategory: params.subCategories
    };
    
    return (
        <div> 
            <Store categoryIdAndSubId={categoryIdAndSubId}  />
        </div>
    );
}
