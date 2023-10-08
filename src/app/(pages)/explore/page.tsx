import Search from '@/components/Pages/Explore/Search'
import ProjectList from '@/components/shared/List/ProjectList'
import React from 'react'
const page = () => {
    return (
        <>
        <Search/>
        <ProjectList title="Based on your skills:" type="open source project" limit={3}/>        
        <ProjectList title="Based on your interests:" type="open source project" limit={3}/>        
        <ProjectList title="More:" type="open science project" limit={3}/>        
        </> 
    )
}

export default page